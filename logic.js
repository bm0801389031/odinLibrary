const newBookBtn = document.getElementById('newBtn');
const popUpForm = document.getElementById('popUp');

newBookBtn.addEventListener('click', () => {
    popUpForm.style.display = 'block';
});

const closeBtn = document.getElementsByTagName('span')[0];

closeBtn.addEventListener('click', () => {
    popUpForm.style.display = 'none';
})

const addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', addBookToLibrary);







class Book {
    constructor(title, author, pages, read){
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value + 'pg';
        this.read = form.read.checked;
    }
}



let myLibrary = []
let newBook





function addBookToLibrary() {
    let title = document.getElementById(title)
    if(title.required && author.required && pages.required == true){ 
    event.preventDefault();
    popUpForm.style.display = 'none';

    newBook = new Book(title, author, pages,read); 
    myLibrary.push(newBook); 
    }
    setData();  //saves updated array in local storage
    render(); 
    form.reset();
    
}



function render(){
    const container = document.querySelector('#Library-container');
    const books = document.querySelectorAll('.book')
    books.forEach(book => container.removeChild(book));

    for(let i = 0; i < myLibrary.length; i++){
        createBook(myLibrary[i])
    }
}



function createBook(item){
    const libContainer = document.getElementById('Library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookDiv.classList.add('book');
    titleDiv.classList.add('title');
    titleDiv.textContent = item.title;
    bookDiv.appendChild(titleDiv);
    authDiv.classList.add('author');
    authDiv.textContent = item.author;
    bookDiv.appendChild(authDiv);
    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);
    readBtn.classList.add('readBtn')
    bookDiv.appendChild(readBtn);
    if (item.read === false){
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = 'red';
        
    } else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = 'green';
    }
    removeBtn.setAttribute('id', 'removeBtn')
    removeBtn.textContent = 'Remove';
    bookDiv.appendChild(removeBtn);
    libContainer.appendChild(bookDiv);
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        render()
        setData()
    });
    readBtn.addEventListener('click', () => {
        item.read = !item.read
        render()
        setData()
    })

}



// setting Library to be stored in local storage
function setData() {

    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));

}




function restore() {

    if(!localStorage.myLibrary) {
        render();

    }else {
        let objects = localStorage.getItem('myLibrary') 
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }

}

restore();