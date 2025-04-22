const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read = false) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

const libraryContainer = document.querySelector(".library");
const addBookForm = document.querySelector(".add");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked ? "Yes" : "No";

    addBookToLibrary(title, author, pages, read);
    addBookCard(title, author, pages, read);
    console.log(myLibrary);
    console.log(`title: ${title} author: ${author} pages: ${pages} read: ${read}`);
})

function addBookCard(title, author, pages, read) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.classList.add("card");

    const titleHeader = document.createElement("h3");
    titleHeader.textContent = "Title";
    bookCard.appendChild(titleHeader);
    const titleParagraph = document.createElement("p");
    titleParagraph.textContent = title;
    bookCard.appendChild(titleParagraph);

    const authorHeader = document.createElement("h3");
    authorHeader.textContent = "Author";
    bookCard.appendChild(authorHeader);
    const authorParagraph = document.createElement("p");
    authorParagraph.textContent = author;
    bookCard.appendChild(authorParagraph);

    const pagesHeader = document.createElement("h3");
    pagesHeader.textContent = "Pages";
    bookCard.appendChild(pagesHeader);
    const pagesParagraph = document.createElement("p");
    pagesParagraph.textContent = pages;
    bookCard.appendChild(pagesParagraph);

    const readHeader = document.createElement("h3");
    readHeader.textContent = "Read?";
    bookCard.appendChild(readHeader);
    const readParagraph = document.createElement("p");
    readParagraph.textContent = read;
    bookCard.appendChild(readParagraph);

    libraryContainer.insertBefore(bookCard, addBookForm);
}

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