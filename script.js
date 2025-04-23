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
        libraryContainer.insertBefore(bookCard, ghostCard);
    })
}

const ghostCard = document.querySelector(".ghost.card");
const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", () => {
    newBookBtn.remove();
    ghostCard.classList.remove("ghost", "card");
    ghostCard.classList.add("add", "card");

    // create form
    const form = document.createElement("form");
    form.classList.add("add-book");
    ghostCard.appendChild(form);

    // create title label and input
    const addTitleLabel = document.createElement("label");
    addTitleLabel.setAttribute("for", "title");
    addTitleLabel.textContent = "Title:";
    form.appendChild(addTitleLabel);
    const addTitleInput = document.createElement("input");
    addTitleInput.setAttribute("type", "text");
    addTitleInput.setAttribute("id", "title");
    addTitleInput.setAttribute("name", "title");
    form.appendChild(addTitleInput);

    // create author label and input
    const addAuthorLabel = document.createElement("label");
    addAuthorLabel.setAttribute("for", "author");
    addAuthorLabel.textContent = "Author:";
    form.appendChild(addAuthorLabel);
    const addAuthorInput = document.createElement("input");
    addAuthorInput.setAttribute("type", "text");
    addAuthorInput.setAttribute("id", "author");
    addAuthorInput.setAttribute("name", "author");
    form.appendChild(addAuthorInput);

    // create pages label and input
    const addPagesLabel = document.createElement("label");
    addPagesLabel.setAttribute("for", "pages");
    addPagesLabel.textContent = "Pages:";
    form.appendChild(addPagesLabel);
    const addPagesInput = document.createElement("input");
    addPagesInput.setAttribute("type", "number");
    addPagesInput.setAttribute("id", "pages");
    addPagesInput.setAttribute("name", "pages");
    form.appendChild(addPagesInput);

    // create read label and input
    const addReadLabel = document.createElement("label");
    addReadLabel.setAttribute("for", "read");
    addReadLabel.textContent = "Read?";
    form.appendChild(addReadLabel);
    const addReadInput = document.createElement("input");
    addReadInput.setAttribute("type", "checkbox");
    addReadInput.setAttribute("id", "read");
    addReadInput.setAttribute("name", "read");
    form.appendChild(addReadInput);

    // create submit button
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("submit");
    submitButton.textContent = "Add Book";
    form.appendChild(submitButton);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
    
        const title = addTitleInput.value;
        const author = addAuthorInput.value;
        const pages = addPagesInput.value;
        const read = addReadInput.checked ? "Yes" : "No";
    
        addBookToLibrary(title, author, pages, read);
        ghostCard.classList.remove("add", "card");
        ghostCard.classList.add("ghost", "card");
        form.remove();
        ghostCard.appendChild(newBookBtn);
        displayBooks();
        console.log(myLibrary);
        console.log(`title: ${title} author: ${author} pages: ${pages} read: ${read}`);
    })
})

console.log(myLibrary);