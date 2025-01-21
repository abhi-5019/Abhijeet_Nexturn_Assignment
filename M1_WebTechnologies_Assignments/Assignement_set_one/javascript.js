let draggedItem = null;

function handleDragStart(event) {
    draggedItem = this;
    setTimeout(() => (this.style.display = "none"), 0);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    if (this.parentElement && this.parentElement.id === "taskList") {
        this.parentElement.insertBefore(draggedItem, this);
    } else if (this.id === "taskList") {
        this.appendChild(draggedItem);
    }
    draggedItem.style.display = "flex";
    draggedItem = null;
    saveTasks();
}

function handleDragEnd() {
    if (draggedItem) {
        draggedItem.style.display = "flex";
        draggedItem = null;
    }
}

function createTaskElement(taskText, isCompleted) {
    let newTask = document.createElement("li");
    newTask.setAttribute("draggable", "true");
    newTask.innerHTML = `
        <span>${taskText}</span>
        <button class="remove-btn" onclick="removeTask(this)">Remove</button>
    `;
    if (isCompleted) {
        newTask.classList.add("completed");
    }
    newTask.addEventListener('click', function (event) {
        if (!event.target.classList.contains('remove-btn')) {
            newTask.classList.toggle("completed");
            saveTasks();
            updatePendingCount();
        }
    });
    newTask.addEventListener("dragstart", handleDragStart);
    newTask.addEventListener("dragover", handleDragOver);
    newTask.addEventListener("drop", handleDrop);
    return newTask;
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText) {
        let taskList = document.getElementById("taskList");
        let newTask = createTaskElement(taskText, false);
        taskList.appendChild(newTask);
        taskInput.value = "";
        saveTasks();
        updatePendingCount();
    }
}

function removeTask(taskButton) {
    let taskToRemove = taskButton.parentElement;
    taskToRemove.remove();
    saveTasks();
    updatePendingCount();
}

function saveTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = [];
    taskList.querySelectorAll("li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").textContent,
            isCompleted: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach((task) => {
        let taskElement = createTaskElement(task.text, task.isCompleted);
        taskList.appendChild(taskElement);
    });
    updatePendingCount();
}

function updatePendingCount() {
    let taskList = document.getElementById("taskList");
    let pendingCount = taskList.querySelectorAll("li:not(.completed)").length;
    document.getElementById("pendingCount").textContent = `Pending tasks: ${pendingCount}`;
}

document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    document.addEventListener("dragend", handleDragEnd);
});
