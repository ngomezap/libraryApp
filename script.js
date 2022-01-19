function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function(){
        if(read){
            return `${title} by ${author}, ${pages} pages, already read`;
        }else{
            return `${title} by ${author}, ${pages} pages, not read yet`;
        }
    }
}

function addBookLibrary(){
    const title = prompt('Title:');
    const author = prompt('Author:');
    const pages = parseInt(prompt('Pages:'));
    let read;
    do{
        read = prompt('Read? (y/n)');
    }while(!read.toLowerCase() === 'y' && !read.toLowerCase() === 'n');
    if(read.toLowerCase() === 'y'){
        read = true;
    }else{
        read = false;
    }
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
    addToTable(book);
}

function addToTable(book){
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
        }else{
            const div = document.createElement('div');
            div.innerText = book[key];
            div.setAttribute('data-index', myLibrary.map(e => e.title).indexOf(book.title));
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
            book.remove();
        }
    })
}

function readBook(e){
    const bookDivs = Array.from(container.childNodes);
    
    bookDivs.forEach(function(book){
        let index = book.firstChild.getAttribute('data-index');
        if(e.currentTarget.getAttribute('data-index') === index){
            if(myLibrary[index].read){
                myLibrary[index].read = false;
                book.childNodes[3].innerText = 'Not read';
                book.childNodes[3].setAttribute('class', 'notRead');
            }else{
                myLibrary[index].read = true;
                book.childNodes[3].innerText = 'Read';
                book.childNodes[3].setAttribute('class', 'read');
            }
        }
    })
}

function deleteColumn(book){
    deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-index', myLibrary.map(e => e.title).indexOf(book.title));
    container.lastChild.appendChild(deleteButton);
    
    //Add icon to delete button
    crossSymbol = document.createElement('img');
    crossSymbol.setAttribute('src', './images/symbolX.svg');
    deleteButton.appendChild(crossSymbol);

    deleteButton.addEventListener('click', deleteBook)
}

function readColumn(book){
    readButton = document.createElement('button');
    readButton.setAttribute('data-index', myLibrary.map(e => e.title).indexOf(book.title));
    
    //Add icon to read button
    eyeSymbol = document.createElement('img');
    eyeSymbol.setAttribute('src', './images/symbolEye.png');
    readButton.appendChild(eyeSymbol);
    container.lastChild.appendChild(readButton);
    readButton.addEventListener('click', readBook);
}

const container = document.getElementById('books');
const newBook = document.getElementById('newBook');

let myLibrary = [];

const laPeste = new Book('La Peste', 'Albert Camus', 359, true);
const elExtranjero = new Book('El Extranjero', 'Albert Camus', 201, false);

myLibrary.push(laPeste, elExtranjero);

myLibrary.forEach(function(book){
    addToTable(book);
})

newBook.addEventListener('click', addBookLibrary)
