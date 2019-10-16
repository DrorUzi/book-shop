'use strict'


var gTrans = {
    'web-title': {
        he: 'חנות ספרים',
        en: 'book-shop'
    },
    title: {
        he: 'חנות הספרים שלי',
        en: 'WELCOME TO MY BOOK SHOP'
    },
    subtitle: {
        en: 'The best books online',
        he: 'הספרים הטובים ביותר באינטרנט'
    },
    add:{
        en: 'Add new book',
        he: 'הוסף ספר חדש'
    },
    'sort-name': {
        en: 'Name',
        he: 'שם'
    },
    'sort-price': {
        en: 'Price',
        he: 'מחיר'
    },
    photo : {
        en: 'Photo',
        he: 'תמונה'
    },
    rating: {
        en: 'Rating',
        he: 'דירוג'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    prev: {
        en: 'Prev Page',
        he: 'העמוד הקודם'
    },
    next: {
        en: 'Next Page',
        he: 'העמוד הבא'
    },
    delete: {
        en: 'DELETE',
        he: 'מחק'
    },
    update: {
        en: 'UPDATE',
        he: 'עדכן'
    },
    read: {
        en: 'READ',
        he: 'קרא'
    },
    sure: {
        en: 'Are you sure?',
        he: 'האם אתה בטוח?',
    },
    cost:{
        en: 'How much does it cost?',
        he:'מה המחיר של הספר?'
    },
    'new-cost':{
        en: 'What is your new price?',
        he: 'מה המחיר המעודכן של הספר?'
    },
    price:{
        en: 'Price',
        he: 'מחיר'
    },
    'book-name':{
        en:'Type the book name',
        he: 'מה שם הספר?'
    }

}

var gCurrLang = 'en';

function doTrans(){
    var els = document.querySelectorAll('[data-trans]')
    for (var i = 0; i < els.length; i++){
        var el = els[i]
        var trasnKey = el.dataset.trans;
        var txt = getTrans(trasnKey);
        el.innerText = txt
    }
}

function getTrans(trasnKey){
    var keyTrans = gTrans[trasnKey];
    if(!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];
    if(!txt) txt = keyTrans['en'];
    return txt
}

function setLang(lang) {
    gCurrLang = lang;
}


function formatCurrency(num) {
    if (gCurrLang === 'en')
    return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(num);
    else return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
    
}

function convertCurrency(num){
    if(gCurrLang === 'he')
    return num * 3.4
    else return num
}