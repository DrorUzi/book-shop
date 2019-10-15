'use strict'

function onInit() {
    renderBooks();
    localStorage.clear();
}



function renderBooks() {
    var books = getBooks();
    var elBooksTable = document.querySelector('.books');
    var strHTML = '';
    books.forEach(function (book) {
        strHTML += `<tr>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><img src="img/${book.imgUrl}.jpg" alt="book"/></td>
        <td>${book.rating}
        <td><button type="button" class="add-book btn btn-dark remove-book m-0"
        onclick="onDeleteBook(${book.id})">DELET</button>
        <button type="button" class="add-book btn btn-dark update-book m-0"
        onclick="readAndUpdateBook(${book.id})">UPDATE</button>
        <button type="button" class="add-book btn btn-dark onRead-book m-0"
        onclick="onReadBook(${book.id})">READ</button>
        </tr>`;
    });
    elBooksTable.innerHTML = strHTML;
}



function renderModal(){
    toggleModal();

}

function onReadBook(bookId) {
    var book = findBook(bookId);
    var elBookModal = document.querySelector('.modal-content');
    var strHTML = '';
    strHTML += `<button class="close-button" onclick="closeModal()">x</button>
    <h2>${book.name}</h2>
    <img src="img/${book.imgUrl}.jpg" alt="book"/>
    <h2>Price : ${book.price}</h2>
    <h2>Rating</h2>
    <p><button onclick="onRateBook(${bookId}, 1)">+</button> ${book.rating}
    <button onclick="onRateBook(${bookId}, -1)">-</button></p>`
    elBookModal.innerHTML = strHTML
}


function onRateBook(bookId,changeBy) {
    getRate(bookId,changeBy)
    onReadBook(bookId);
    renderBooks();
}

function toggleModal() {
    var modal = document.querySelector('.modal')
    modal.classList.toggle("show-modal");
}

function closeModal() {
    var elCloseModal = document.querySelector(".close-button");
    elCloseModal.addEventListener("click", toggleModal());

}



function onDeleteBook(bookId) {
    var isSure = confirm('Are you sure?')
    if (!isSure) return;
    deleteBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var bookName = prompt('Type the book name');
    var bookPrice = prompt('How much does it cost?')
    addBook(bookName, bookPrice);
    renderBooks();
}

function readAndUpdateBook(bookId) {
    var price = +prompt('What is your new price?');
    updateBook(bookId, price);
    renderBooks();
}

function onSortBooks(elBtn){
    sortBooks(elBtn);
    renderBooks();
}


function onNextPage() {
    var btn = document.querySelector('.next')
    var page = nextPage()
    if(!page){
    btn.style.display='none';
    } 
    renderBooks();
}

function onPrevPage() {
    var page = prevPage();
    var btn = document.querySelector('.prev')
    if(!page){
        btn.style.display='none'; 
    } 
    renderBooks();
}