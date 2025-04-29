// DOM variables
const libraryContainer = document.querySelector(".library");
const addBookForm = document.querySelector(".add");
const ghostCard = document.querySelector(".ghost.card");
const newBookBtn = document.querySelector("#new-book");

const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.id = crypto.randomUUID();
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this["Read?"] = read;
}

function addBookToLibrary(title, author, pages, read = false) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createCard(book) {
    const card = document.createElement("div");
    card.classList.add("book", "card");
    card.dataset.id = book.id;

    removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.classList.add("remove-button");
    
    readBtn = document.createElement("button");
    readBtn.textContent = book["Read?"];
    readBtn.classList.add("read-button");

    // fill in contents
    for (const [key, value] of Object.entries(book)) {
        if (key == "id") continue; // skip id
        // create a header for each Book property
        const header = document.createElement("h3");
        header.textContent = key;
        // create the paragraphs with the corresponding info
        const paragraph = document.createElement("p");
        if (key != "Read?") {
            paragraph.textContent = value;
        }
        // add each header/paragraph pair to the card
        card.appendChild(header);
        card.appendChild(paragraph);
    }
    // mark as read
    card.appendChild(readBtn);
    readBtn.addEventListener("click", () => {
        markRead(book.id);
    })
    // remove book
    card.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
        removeBook(book.id);
    })



    // add new card before the ghost card
    libraryContainer.insertBefore(card, ghostCard);
}

function createInput(form, labelText, type, id) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;

    form.appendChild(label);
    form.appendChild(input);
}

function createForm() {
    // create form
    const form = document.createElement("form");
    form.classList.add("add-book");
    ghostCard.appendChild(form);

    // create labels and inputs
    createInput(form, "Title:", "text", "title");
    createInput(form, "Author:", "text", "author");
    createInput(form, "Pages:", "number", "pages");
    createInput(form, "Read?", "checkbox", "read");

    // create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.id = "submit";
    submitButton.textContent = "Add Book";
    form.appendChild(submitButton);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const read = document.querySelector("#read").checked ? "Yes" : "No";
    
        addBookToLibrary(title, author, pages, read);
        ghostCard.classList.remove("add", "card");
        ghostCard.classList.add("ghost", "card");
        form.remove();
        ghostCard.appendChild(newBookBtn);
        displayBooks();
        console.log(myLibrary);
    })
}

function displayBooks() {
    // clear books already being displayed
    const currentBooks = document.querySelectorAll(".book.card");
    currentBooks.forEach(book => book.remove());

    myLibrary.forEach((book) => { // loop through array of books
        createCard(book); // create a card for each book
    })
}

newBookBtn.addEventListener("click", () => {
    // clear ghost card, turn it into the "add book" form card
    newBookBtn.remove();
    ghostCard.classList.remove("ghost", "card");
    ghostCard.classList.add("add", "card");

    createForm();
})

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    displayBooks(); // update display (only shows books in array)
}

function markRead(id) {
    myLibrary.forEach((book) => {
        if (book.id == id) {
            book["Read?"] = (book["Read?"] == "Yes") ? "No" : "Yes";
        }
    })
    displayBooks();
}