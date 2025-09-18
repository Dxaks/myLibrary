const myLibrary = [];

function Book(name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;
}

function addBookToLibrary(name, author, year) {
   const myBook = new Book(name, author, year)
         myBook.id = crypto.randomUUID().
                     substring(0, 8);
   myLibrary.push(myBook)
}

addBookToLibrary('Anatomy', 'By Fisher', 1998)
addBookToLibrary('Physiology', 'By Usher', 2019)
addBookToLibrary('Physics', 'By Michael', 2023)

const myBooksCard = document.querySelector('main')

function displayBooks(books) {

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

    deleteBtn.addEventListener('click', (e) => {
        deleteCard(e, myLibrary)
    });

            bookName.textContent = book.name;
            author.textContent = book.author;
            year.textContent = book.year;
            bookId.textContent = book.id;

        myBooksCard.appendChild(bookCard);        
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks(myLibrary)
})

const dialogBox = document.querySelector('dialog');
const createBtn = document.querySelector('.create');
const formBtn = document.querySelectorAll('form button')

createBtn.addEventListener('click', () => {
    dialogBox.showModal()
    let focusBtn = formBtn[1]
        focusBtn.focus();
});

formBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {

        e.preventDefault()

        const userInputName = document.getElementById('book_name').value;
        const userInputAuthor = document.getElementById('author').value;
        const userInputYear = document.getElementById('year').value;

        if (e.target.textContent === 'Cancel') {
            dialogBox.close()
        } 
        else if (e.target.textContent === 'Submit' && (!userInputName ||                  !userInputAuthor || !userInputYear) ) {
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

function deleteCard(event, array) {
    let item = event.target.parentElement;
    let dataAttribute = item.getAttribute('data-id');

    let bookToremove = array.findIndex(book => dataAttribute === book.id);
    
    if (bookToremove > -1) {
        array.splice(bookToremove, 1);
    }
   item.remove();
}


    
