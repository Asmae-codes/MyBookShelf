// ===== SELECT ELEMENTS =====
const addBookBtn = document.getElementById("addBookBtn");
const viewLibraryBtn = document.getElementById("viewLibraryBtn");
const addBookModal = document.getElementById("addBookModal");
const closeModal = document.getElementById("closeModal");
const bookForm = document.getElementById("bookForm");
const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");

// ===== DEFAULT BOOKS =====
let defaultBooks = [
  {
    title: "الداء والدواء",
    author: "ابن القيم الجوزية",
    summary:
      "This book addresses the diseases of the human heart and their causes, then explains the legitimate remedies based on the Quran and the Sunnah.",
    publicationDate: "2008-01-01",
    writtenDate: "1350-01-01",
    docLink: "https://kolalkotob.com/public/book8749.html",
    cover: "assets/images/book2.jpeg",
    category: "Religion",
    rating: 5,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    summary: "An easy & proven way to build good habits & break bad ones.",
    publicationDate: "2018-10-16",
    writtenDate: "2018-01-01",
    docLink:"https://drive.google.com/file/d/1eAZMdXO-Zn4_90TV365KMpIqfxUy7J0t/view",
    cover: "assets/images/book1.jpeg",
    category: "Self-Help",
    rating: 5,
  },
];

// ===== LOADING BOOKS =====

books = defaultBooks;
localStorage.setItem("books", JSON.stringify(books));

// ===== FUNCTION TO RENDER BOOKS =====
function renderBooks(filter = "") {
  booksContainer.innerHTML = "";
  books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase()),
    )
    .forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";
      const stars = "⭐".repeat(book.rating);
      bookCard.innerHTML = `
            <img src="${book.cover}" alt="Book Cover">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>${book.summary}</p>
            <p>Published: ${book.publicationDate}</p>
            <p>Written: ${book.writtenDate}</p>
            <p>Category: ${book.category}</p>
            <p class="stars">${stars}</p>
            <a href="${book.docLink}" target="_blank">😍📰 View Document</a>
            <button onclick="deleteBook(${index})">🗑️❌ Delete</button>
        `;
      booksContainer.appendChild(bookCard);
    });
}

// ===== ADD BOOK BUTTONS =====
addBookBtn.addEventListener("click", () => {
  addBookModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  addBookModal.classList.add("hidden");
});

// ===== SUBMIT NEW BOOK =====
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    summary: document.getElementById("summary").value,
    publicationDate: document.getElementById("publicationDate").value,
    writtenDate: document.getElementById("writtenDate").value,
    docLink: document.getElementById("docLink").value || "#",
    cover: "assets/images/book-placeholder.png",
    category: document.getElementById("category").value,
    rating: 0,
  };
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
  bookForm.reset();
  addBookModal.classList.add("hidden");
});

// ===== DELETE BOOK =====
function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  }
}

// ===== VIEW LIBRARY BUTTON =====

renderBooks();

// ===== SEARCH FUNCTION =====
searchInput.addEventListener("input", () => {
  renderBooks(searchInput.value);
});

// ===== INITIAL RENDER =====
renderBooks();
