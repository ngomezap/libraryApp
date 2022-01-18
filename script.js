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
    const divBook = document.createElement('div');
    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.setAttribute('data-index', myLibrary.map(e => e.title).indexOf(book.title));
    container.appendChild(divBook);
    for(key in book){
        if(key === 'info'){
            continue;
        }else{
            const div = document.createElement('div');
            div.innerText = book[key];
            div.setAttribute('data-index', myLibrary.map(e => e.title).indexOf(book.title));
            divBook.appendChild(div);
        }
    }
    divBook.appendChild(button);
    button.addEventListener('click', deleteBook)
}

function deleteBook(e){
    const bookDivs = Array.from(container.childNodes).splice(3);
    bookDivs.forEach(function(book){
        if(e.target.getAttribute('data-index') === book.firstChild.getAttribute('data-index')){
            book.remove();
        }
    })
}

const container = document.getElementById('books');
const newBook = document.getElementById('newBook');

let myLibrary = [];

myLibrary.push(new Book('The Hobbit', 'JRR Tolkien', 295, false));
myLibrary.push(new Book('The Identity', 'Milan Kundera', 180, true));

myLibrary.forEach(function(book){
    addToTable(book);
});

newBook.addEventListener('click', addBookLibrary)
