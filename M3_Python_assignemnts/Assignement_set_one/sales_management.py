
from book_management import add_book, view_books, search_book
from customer_management import add_customer, view_customers
from sales_management import sell_book, view_sales

def main_menu():
    while True:
'''
3. Sales Management 
    o Sell a book to a customer (reduce the book quantity after a sale and log the transaction). 
    o View all sales records. 
'''

from customer_management import customers
from book_management import books, Book

class Transaction:
    def __init__(self, customer_name, book_title, quantity_sold):
        self.customer_name = customer_name
        self.book_title = book_title
        self.quantity_sold = quantity_sold

    def display_details(self):
        return f"Customer: {self.customer_name}, Book: {self.book_title}, Quantity Sold: {self.quantity_sold}"


sales = []

# Sell a book to a customer (reduce the book quantity after a sale and log the transaction). 
def sell_book(customer_name, book_title, quantity_sold):
    try:
        quantity_sold = int(quantity_sold)
        if quantity_sold <= 0:
            raise ValueError("Quantity must be positive.")
        
        book = next((b for b in books if b.title.lower() == book_title.lower()), None)
        if not book:
            return "Error: Book not found."
        if book.quantity < quantity_sold:
            return f"Error: Only {book.quantity} copies available. Sale cannot be completed."
        
        book.quantity -= quantity_sold
        sales.append(Transaction(customer_name, book.title, quantity_sold))
        return f"Sale successful! Remaining quantity: {book.quantity}"
    except ValueError as e:
        return f"Invalid input! {e}"

# View all sales records.
def view_sales():
    if not sales:
        return "No sales records available."
    return "\n".join(sale.display_details() for sale in sales)

        print("\nWelcome to BookMart!")
        print("1. Book Management")
        print("2. Customer Management")
        print("3. Sales Management")
        print("4. Exit")
        
        choice = input("Enter your choice: ")
        if choice == "1":
            book_menu()
        elif choice == "2":
            customer_menu()
        elif choice == "3":
            sales_menu()
        elif choice == "4":
            print("Thank you for using BookMart!")
            break
        else:
            print("Invalid choice. Please try again.")

def book_menu():
    while True:
        print("\nBook Management")
        print("1. Add Book")
        print("2. View Books")
        print("3. Search Book")
        print("4. Back to Main Menu")
        
        choice = input("Enter your choice: ")
        if choice == "1":
            title = input("Title: ")
            author = input("Author: ")
            price = input("Price: ")
            quantity = input("Quantity: ")
            print(add_book(title, author, price, quantity))
        elif choice == "2":
            print(view_books())
        elif choice == "3":
            query = input("Enter title or author to search: ")
            print(search_book(query))
        elif choice == "4":
            break
        else:
            print("Invalid choice. Please try again.")

def customer_menu():
    while True:
        print("\nCustomer Management")
        print("1. Add Customer")
        print("2. View Customers")
        print("3. Back to Main Menu")
        
        choice = input("Enter your choice: ")
        if choice == "1":
            name = input("Name: ")
            email = input("Email: ")
            phone = input("Phone: ")
            print(add_customer(name, email, phone))
        elif choice == "2":
            print(view_customers())
        elif choice == "3":
            break
        else:
            print("Invalid choice. Please try again.")

def sales_menu():
    while True:
        print("\nSales Management")
        print("1. Sell Book")
        print("2. View Sales Records")
        print("3. Back to Main Menu")
        
        choice = input("Enter your choice: ")
        if choice == "1":
            customer_name = input("Customer Name: ")
            book_title = input("Book Title: ")
            quantity_sold = input("Quantity: ")
            print(sell_book(customer_name, book_title, quantity_sold))
        elif choice == "2":
            print(view_sales())
        elif choice == "3":
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main_menu()
