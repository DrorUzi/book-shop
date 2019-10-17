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
        <td>${formatCurrency(convertCurrency(book.price))}</td>
        <td><img src="img/${book.imgUrl}.jpg" alt="book"/></td>
        <td>${book.rating}
        <td><button type="button" class="add-book btn btn-dark remove-book"
        onclick="onDeleteBook(${book.id})" data-trans="delete">DELETE</button>
        <button type="button" class="add-book btn btn-dark update-book"
        onclick="readAndUpdateBook(${book.id})" data-trans="update">UPDATE</button>
        <button type="button" class="add-book btn btn-dark onRead-book"
        onclick="onReadBook(${book.id})" data-trans="read"></button>
        </tr>`;
    });
    elBooksTable.innerHTML = strHTML;
    doTrans()
}




function onReadBook(bookId) {
    toggleModal();
    var book = findBook(bookId);
    var elBookModal = document.querySelector('.modal-content');
    var strHTML = `<button class="close-button" onclick="closeModal()">x</button>
    <h2 class="modal-header">${book.name}</h2>
    <img src="img/${book.imgUrl}.jpg" alt="book"/>
    <h2 class="modal-header"><span data-trans="price"></span>:${formatCurrency(book.price)}</h2>
    <h2 data-trans="rating" class="modal-header"></h2>
    <button class="btn-rate" onclick="onRateBook(${bookId}, 1)">+</button><p class="rating-num">${book.rating}</p>
    <button class="btn-rate" onclick="onRateBook(${bookId}, -1)">-</button>`
    elBookModal.innerHTML = strHTML
    doTrans()
}


function onRateBook(bookId,changeBy) {
    getRate(bookId,changeBy)
    onReadBook(bookId);
    renderBooks();
}

function toggleModal() {
    var modal = document.querySelector('.modal')
    modal.classList.toggle('show-modal');
}

function closeModal() {
    var elCloseModal = document.querySelector(".close-button");
    elCloseModal.addEventListener("click", toggleModal());

}



function onDeleteBook(bookId) {
    var isSure = confirm(getTrans('sure'))
    if (!isSure) return;
    deleteBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var bookName = prompt(getTrans('book-name'));
    var bookPrice = prompt(getTrans('cost'))
    addBook(bookName, bookPrice);
    renderBooks();
}

function readAndUpdateBook(bookId) {
    var price = +prompt(getTrans('new-cost'));
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


function onSetLang(lang){
    setLang(lang);
    if(lang === 'he'){
        document.body.classList.add('rtl')
    }else {
        document.body.classList.remove('rtl')
    }
    doTrans();
    renderBooks();
}