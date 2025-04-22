const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read = false) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// DOM variables
const libraryContainer = document.querySelector(".library");
const addBookForm = document.querySelector(".add");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const submitBtn = document.querySelector("#submit");

function displayBooks() {
    // clear books already being displayed
    const currentBooks = document.querySelectorAll(".book.card");
    currentBooks.forEach(book => book.remove());

    myLibrary.forEach((book) => { // loop through array of books
    // create a card for the book
        const bookCard = document.createElement("div");
        bookCard.classList.add("book", "card");
        bookCard.setAttribute("data-id", book.id); // assign each book's unique id to their respective card

    // fill in details within the card
        // title
        const titleHeader = document.createElement("h3");
        titleHeader.textContent = "Title";
        bookCard.appendChild(titleHeader);
        const titleParagraph = document.createElement("p");
        titleParagraph.textContent = book.title;
        bookCard.appendChild(titleParagraph);
        // author
        const authorHeader = document.createElement("h3");
        authorHeader.textContent = "Author";
        bookCard.appendChild(authorHeader);
        const authorParagraph = document.createElement("p");
        authorParagraph.textContent = book.author;
        bookCard.appendChild(authorParagraph);
        // pages
        const pagesHeader = document.createElement("h3");
        pagesHeader.textContent = "Pages";
        bookCard.appendChild(pagesHeader);
        const pagesParagraph = document.createElement("p");
        pagesParagraph.textContent = book.pages;
        bookCard.appendChild(pagesParagraph);
        // read status
        const readHeader = document.createElement("h3");
        readHeader.textContent = "Read?";
        bookCard.appendChild(readHeader);
        const readParagraph = document.createElement("p");
        readParagraph.textContent = book.read;
        bookCard.appendChild(readParagraph);
    
    // add each book card before the "new book" card
        libraryContainer.insertBefore(bookCard, addBookForm);
    })
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked ? "Yes" : "No";

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    console.log(myLibrary);
    console.log(`title: ${title} author: ${author} pages: ${pages} read: ${read}`);
})

console.log(myLibrary);


/*
    when the form is submitted
    add a new card div containing the info

    save inputs 
    update displays

    loop through library array and display divs for each book
 */

/*
    already an "add book" card, which is actually the form
    filling it out and clicking it adds the book before the form
 */