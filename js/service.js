'use strict'
const BOOKS_KEY = 'books';
var gNextId = 101;
var gBooks;
const booksInPageCount = 2;
var gCurrPage = 0;

createBooks()


function createBook(name, price, imgUrl) {
    return {
        id: gNextId++,
        name: name,
        price: price,
        imgUrl: imgUrl,
        rating: 1
    }
}

function createBooks() {
    var books = loadBooksFromStorage();
    if (!books || books.length === 0) {
        books = [createBook('The Dice Man', 20, 'thediceman'),
            createBook('The Godfather', 30, 'thegodfather'), createBook('Fight Club', 15, 'fightclub'),
            createBook('Requiem for a Dream', 30, 'requiem'), createBook('Full Metal Jacket', 20, 'metaljacket'),
            createBook(`Breakfast at Tiffany's`, 15, 'breakfast'), createBook('Lolita', 10, 'lolita')
        ];
    }
    gBooks = books;
    saveBooksToStorage();
}


function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}

function getBooks() {
    var startIdx = booksInPageCount * gCurrPage;
    return gBooks.slice(startIdx , startIdx + booksInPageCount)
   
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return book.id === bookId
    })
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage();
}

function addBook(name, price) {
    var book = createBook(name, price);
    gBooks.unshift(book);
    saveBooksToStorage();

}

function updateBook(bookId, price) {
    var book = gBooks.find(function(book) {
        return book.id === bookId
    })
    if (!book) return;
    book.price = price
    saveBooksToStorage();
}



function findBook(bookId) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    return book;
}



function getRate(bookId,changeBy){
    var book = findBook(bookId);
    var rating = book.rating;
    rating += changeBy
    if(rating > 10) rating =10;
    if(rating < 0) rating = 0
    book.rating = rating
    saveBooksToStorage();
}


function sortBooks(elBtn){
    var btn = elBtn.innerText
    if (btn === 'Name'){
        gBooks.sort(function(a,b){
            var bookA = a.name.toUpperCase();
            var bookB = b.name.toUpperCase();
            return (bookA < bookB) ? -1 : (bookA > bookB) ? 1 : 0
        })
    }
    else {
        gBooks.sort(function(a,b){
            return a.price - b.price
        })
    }

}


function nextPage(){
    if(gCurrPage < (gBooks.length / booksInPageCount)-1){
        gCurrPage++;
        return true;
    }
    return false;
}


function prevPage(){
    if(gCurrPage < gBooks.length / booksInPageCount){
    gCurrPage--;
    return true;
    }
    return false;
}