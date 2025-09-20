// an array that stores each book object
const myLibrary = [];

// a function constructor for books
function Book(name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;
}

// a function that add each created book into the array (myLibrary)
function addBookToLibrary(name, author, year) {
   const myBook = new Book(name, author, year)
         myBook.id = crypto.randomUUID().
                     substring(0, 8);
   myLibrary.push(myBook)
}

// some custom books to show on the display
addBookToLibrary('Principles of internal medicine', 'By Harrison', 2025)
addBookToLibrary('Current Medical Diagnosis', 'By Michael W. et al', 2019)
addBookToLibrary('Washington Manual of Medicine', 'Wikipedia', 2025)
addBookToLibrary('The Merck Manual of Diagnosis and Therapy', 'By Robert S. Porter', 2020)
addBookToLibrary('Oxford Handbook of Clinical Medicine', 'By Murray Longmore', 2020)
addBookToLibrary('Kumar and Clark Clinical Medicine', 'By Parveen Kumar', 2021)
addBookToLibrary('Anatomy & Physiology For Dummies', 'By Maggie Norris', 2019)
addBookToLibrary('Guyton and Hall Textbook of Medical Physiology', 'By John E. Hall', 2020)
addBookToLibrary('Medical Physiology: A Systems Approach', 'By Hershel Raff', 2021)
addBookToLibrary('Human Physiology: From Cells to Systems', 'By Lauralee Sherwood', 2018)

// container that hold books in form of cards
const myBooksCard = document.querySelector('main')
// function that display books 
function displayBooks(books) {
// array method to loop through each book and create elements based on book properties
    return books.forEach(book => {
        let bookCard = document.createElement('div');
            bookCard.classList.add('card');
            bookCard.setAttribute('data-id', book.id);

            console.log(bookCard)

        let bookName = document.createElement('p');
            bookName.classList.add('book_title');
            bookCard.appendChild(bookName);

        let author = document.createElement('p');
            author.classList.add('book_author');
            bookCard.appendChild(author);

        let year = document.createElement('p');
            year.classList.add('book_year');
            bookCard.appendChild(year);
        
        let bookId = document.createElement('p');
            bookId.classList.add('book_id');
            bookCard.appendChild(bookId);

        let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete_btn');
            deleteBtn.textContent = 'Remove';
            bookCard.appendChild(deleteBtn);

        let readBtn = document.createElement('button');
            readBtn.classList.add('readBtn');
            readBtn.textContent = 'not read'
            bookCard.appendChild(readBtn)
// delete btn for removing books from the array and the DOM
    deleteBtn.addEventListener('click', (e) => {
        deleteCard(e, myLibrary)
    });
// read btn to toggle read status for book
    readBtn.addEventListener('click', (e) => {
        book.readStatus(e);
    })

            bookName.textContent = book.name;
            author.textContent = book.author;
            year.textContent = book.year;
            bookId.textContent = `book ID: ${book.id}`;

        myBooksCard.appendChild(bookCard);        
    });
}
// event handler to display custom books for each load
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(myLibrary)
})

// dialog, btn, and form btn (cancel / submit) 
const dialogBox = document.querySelector('dialog');
const createBtn = document.querySelector('.create');
const formBtn = document.querySelectorAll('form button')

// event handler to show the dialog
createBtn.addEventListener('click', () => {
    dialogBox.showModal()
    let focusBtn = formBtn[1]
        focusBtn.focus();
});

// function that loops through each form btn
formBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {

        e.preventDefault()
        // userInput for to create new book
        const userInputName = document.getElementById('book_name').value;
        const userInputAuthor = document.getElementById('author').value;
        const userInputYear = document.getElementById('year').value;

        if (e.target.textContent === 'Cancel') {
            dialogBox.close()
        } 
        else if (e.target.textContent === 'Submit' && (!userInputName || !userInputAuthor || !userInputYear) ) {
            return;
        }
        else if (e.target.textContent === 'Submit') {
            
            myBooksCard.innerHTML = '';

            addBookToLibrary(userInputName, userInputAuthor, userInputYear);
            displayBooks(myLibrary);
            document.querySelector('form').reset()
            dialogBox.close()
        }
    })
})

// function that removes book from the array and the DOM
function deleteCard(event, array) {
    let item = event.target.parentElement;
    let dataAttribute = item.getAttribute('data-id');

    let bookToremove = array.findIndex(book => dataAttribute === book.id);
    
    if (bookToremove > -1) {
        array.splice(bookToremove, 1);
    }
   item.remove();
}

// prototype for each book read status attached to the constructor function
Book.prototype.readStatus = function(event) {

    if (event.target.classList.toggle('read')) {
        event.target.textContent = 'read';
        event.target.style.backgroundColor = 'blue';
        this.isRead = true;
    } else {
        event.target.textContent = 'not read'
        event.target.style.backgroundColor = '';
        this.isRead = false;
    }
}


    
