let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(amount, description, category) {
  if (!amount || !description || !category) {
    alert('Please fill in all fields.');
    return;
  }
  expenses.push({ amount: parseFloat(amount), description, category });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateUI();
}

function deleteExpense(index) {
  if (index < 0 || index >= expenses.length) {
    return;
  }
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateUI();
}

function calculateTotals() {
  const totals = {};
  expenses.forEach((expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  });
  return totals;
}

function updateUI() {
  displayExpenses();
  const totals = calculateTotals();
  updateChart(totals);
}

function displayExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const listItem = document.createElement('div');
    listItem.className = 'expense-item';
    listItem.innerHTML = `
      <span>${expense.description}</span>
      <span>${expense.category}</span>
      <span>$${expense.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(listItem);
  });
}

document.getElementById('expense-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  addExpense(amount, description, category);
  document.getElementById('expense-form').reset();
});

document.addEventListener('DOMContentLoaded', () => {
  updateUI();
});
