class Book{

    constructor(id, title, author, pages, read){
        this.id = id;
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    static getId = function(){
        let lastId = 0;
        while(listOfKeys.includes(lastId.toString())){
            lastId++;
        }
        return lastId;
    }
    
    info = () => {
        if(read){
            return `${title} by ${author}, ${pages} pages, already read`;
        }else{
            return `${title} by ${author}, ${pages} pages, not read yet`;
        }
    }
}

function addBookLibrary(){

    let title = titulo.value;
    let author = autor.value;
    let pages = paginas.value;
    let read = false;
    if(checkbox.checked){
        read = true;
    }
    /*do{
        read = prompt('Read? (y/n)');
    }while(!read.toLowerCase() === 'y' && !read.toLowerCase() === 'n');
    if(read.toLowerCase() === 'y'){
        read = true;
    }else{
        read = false;
    }*/
    book = new Book(Book.getId(), title, author, pages, read);
    myStorage.setItem(book.id, JSON.stringify(book));
    addToTable(book);
    form.className = 'hidden'
}

function addToTable(book){
    let counter = 0;
    //Create 'div' where book data will be stored
    const divBook = document.createElement('div');
    container.appendChild(divBook);
    //Loop all keys in book
    for(key in book){
        if(key === 'info'){
            continue;
        }else if(key === 'read'){
            if(book[key]){
                const div = document.createElement('div');
                div.innerText = 'Read';
                div.setAttribute('class', 'read');
                divBook.appendChild(div);
            }else{
                const div = document.createElement('div');
                div.innerText = 'Not read';
                div.setAttribute('class', 'notRead');
                divBook.appendChild(div);
            }
        }else if(counter === 0){
            counter++;
            continue;
        }else{
            const div = document.createElement('div');
            div.innerText = book[key];
            div.setAttribute('data-index', book.id);
            divBook.appendChild(div);
            if(key === 'pages'){
                div.innerText += ' pp';
            }
        }
    }
    //Add delete button for every book
    deleteColumn(book);
    //Add read button for every book
    readColumn(book);
}

function deleteBook(e){
    const bookDivs = Array.from(container.childNodes);
    bookDivs.forEach(function(book){
        if(e.currentTarget.getAttribute('data-index') === book.firstChild.getAttribute('data-index')){
            myStorage.removeItem(e.currentTarget.getAttribute('data-index'));
            book.remove();
        }
    })
}

function readBook(e){
    const bookDivs = Array.from(container.childNodes);
    
    bookDivs.forEach(function(book){
        let index = book.firstChild.getAttribute('data-index');
        if(e.currentTarget.getAttribute('data-index') === index){
            let bookJS = JSON.parse(myStorage.getItem(index));
            if(bookJS.read === true){
                bookJS.read = false;
                myStorage.setItem(index, JSON.stringify(bookJS));
                book.childNodes[3].innerText = 'Not read';
                book.childNodes[3].setAttribute('class', 'notRead');
            }else{
                bookJS.read = true;
                myStorage.setItem(index, JSON.stringify(bookJS));
                book.childNodes[3].innerText = 'Read';
                book.childNodes[3].setAttribute('class', 'read');
            }
        }
    })
}

function deleteColumn(book){
    deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-index', book.id);
    container.lastChild.appendChild(deleteButton);
    
    //Add icon to delete button
    crossSymbol = document.createElement('img');
    crossSymbol.setAttribute('src', './images/symbolX.svg');
    deleteButton.appendChild(crossSymbol);

    deleteButton.addEventListener('click', deleteBook)
}

function readColumn(book){
    readButton = document.createElement('button');
    readButton.setAttribute('data-index', book.id);
    
    //Add icon to read button
    eyeSymbol = document.createElement('img');
    eyeSymbol.setAttribute('src', './images/symbolEye.png');
    readButton.appendChild(eyeSymbol);
    container.lastChild.appendChild(readButton);
    readButton.addEventListener('click', readBook);
}

const form  = document.getElementsByTagName('form')[0];
const container = document.getElementById('books');
const newBook = document.getElementById('newBook');
const titulo = document.getElementById('titulo');
const autor = document.getElementById('autor');
const paginas = document.getElementById('paginas');
const enviar = document.getElementById('enviar');
const checkbox = document.getElementById('read');

let myStorage = window.localStorage;
let listOfKeys = Object.keys(myStorage);

listOfKeys.forEach((k) => {
    let book = JSON.parse(myStorage.getItem(k));
    addToTable(book);
});

newBook.addEventListener('click', () => {
    if(form.className !== 'floating')
        form.className = 'floating';
    else
        form.className = 'floating hidden';
});

enviar.addEventListener('click', addBookLibrary)
