
// adds a pointer to libform id being the form element
let form = document.getElementById('libform');
// target is within form and listens to the submit type
// on the button, and calls handleForm function this
// function adds a preventDefault method on the event 
// the event being submit witch has a default of reloading
// the page: there for would have caused the form info to be
// lost
form.addEventListener('submit', handleForm);
// second event listener on the same submit type, to call
// submit function 
form.addEventListener('submit', submit);


//this was commented out from the owner
// document.querySelector('#libform').addEventListener('submit', submit);

// prevents page reloads on submit
function handleForm(event) {  
    event.preventDefault();
} 

// pre defined object in the first index of array 
let myLibrary = [
    { 
        title: "Hobbit", 
        author: "Tolkein", 
        pages: 234, 
        status: "Read"
    }
];
// I DONT THINK WE EVEN USED THIS ...
// Book constructor to use if necessary
function Book(title, author, pages, status) { 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// initial population of display with myLibrary data
// grabs the first object in the array
function populate() {
// loop that checks through the array indexes for objects
    for(let i = 0; i < myLibrary.length; i++){
//table variable that add pointer to table id in html
        let table = document.getElementById('table');
//newRow variable inserts a new tr row right below the last tr
        let newRow = table.insertRow(table.length);
//sets an id: and its value being "title" of the array 
//element in the current loop (ie... id: hobbit)
        newRow.setAttribute('id', `${myLibrary[i].title}`);
// insertCell creates a new empty td table data in the new row 
// and the parameter is the location of the cell..
// returned value is a reference to the cell for title
        let t = newRow.insertCell(0);
// returned value is a reference to the cell for author
        let a = newRow.insertCell(1);
// returned value is a reference to the cell pages
        let p = newRow.insertCell(2);
// returned value is a reference to the cell status
        let s = newRow.insertCell(3);
// returned value is a reference to the cell change
        let change = newRow.insertCell(4);
// returned value is a reference to the cell remove
        let del = newRow.insertCell(5);
// gives a status cell an id & a random number
        s.setAttribute('id', Math.random());
// gives the remove cell a class with value remove
        del.setAttribute('class', 'remove');
// gives change cell a class with value switch
        change.setAttribute('class', 'switch');
// assignes (title) variable a value of the current loop index
// object (title property's value) of myLibrary ary (i.e. hobbit)
        let title = myLibrary[i].title;
// assignes (author) variable) a value of the current loop index
// object (author's property's: value of (ie tolkein))
        let author = myLibrary[i].author;
// assignes (pages)variable) a value of the current loop index
// object (pages property's: value of (ie 234))
        let pages = myLibrary[i].pages;
// assignes (status) variable) a value of the current loop index
// object (status property's value of (ie read))
        let status = myLibrary[i].status;
// assignes t datacell innerHTML the value in title
        t.innerHTML = `${title}`;
// assignes a datacell innerHTML the value in author
        a.innerHTML = `${author}`;
// assignes p datacell innerHTML the value in pages
        p.innerHTML = `${pages}`;
// assignes s datacell innerHTML the value in status
        s.innerHTML = `${status}`;
// assignes change innerHTML to Switch 'static doesnt change'
        change.innerHTML = 'Switch';
//assignes del innerHTML a static value of (Remove)
        del.innerHTML = 'Remove';
// callls setActions which gives switch and remove hyperlink
//  event listeners. to add functionality to them
        setActions();
    }
}
// adds the object in to the myLibrary array
function addBook (newBook) { 
    myLibrary.push(newBook);
}
// removes the targeted row on the library table

function remove(event) { 
    console.log(event);
    // varible td access the pointerEvent constructor, then target
// acces the target property which is value current table data
// the parentNode property acces's the table row
    let td = event.target.parentNode;
    console.log(td);
    // access's the tbody parentNode
    let tr = td.parentNode;
    console.log(tr);
    // from td.parentNode removesChild node td
    // being the table row entirely thats removed
    //
    // personally changed the code tr is already declared and
    // can be used below
    //td.parentNode.removeChild(td);
    tr.removeChild(td);

}
// switches status of book in table and myLibrary array 
// to either "Read" or "Unread" depending on what it currently is
function change(event) { 
// varible td access the pointerEvent constructor, then target
// acces the target property which is value current table data
// the parentNode property acces's the table row
    let td = event.target.parentNode;
// this access's the id property of the table row
    let el = td.id;
// this adds a pointer to the table rows cells and returns
// a cell collection  
    let cell = document.getElementById(`${el}`).cells;
// for loop that iterates through every object in the myLibrary array

    for(let i = 0; i < myLibrary.length; i++){
// conditionals make sure that the title at the current object in
// the loop is equal to the table row element wich was set in prev code
// therefore only changing the clicked on table row 
        if (myLibrary[i].title == el && myLibrary[i].status == "Read") {
            myLibrary[i].status = "Unread";
// assign the cell index 3 innerHTML to the status at the current
// obj.status
            cell[3].innerHTML = `${myLibrary[i].status}`;
        }else {
// this does the exact same thing as the previuse line of code
// but only if the status is equal to unread and changes it to read
            if(myLibrary[i].title == el && myLibrary[i].status == "Unread") {
                myLibrary[i].status = "Read";
                cell[3].innerHTML = `${myLibrary[i].status}`;
            } 
        }
    }
}


// takes user form input, creates a book with it, stores 
// the book in the myLibrary array, and adds it to the displayed table
function submit() { 
// targets the form element with id libform: and used with form var
    let form = document.getElementById('libform');
    // reedid this pice of code to a reduce mutate rather than
    // a reduce spread anti pattern
    //let newBook = Array.from(document.querySelectorAll('#libform input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
//Array.from pulls an array of all of my input elements along with'
// their id 
    // reduce mutate: i am iterating a source objects properties to copy 
// them in to a target object
// whats then returned is an object with 3 propertys
// title: 'value', author: 'value', pages: 'value'
    let newBook = Array.from(document.querySelectorAll('#libform input')).reduce((acc, input) => {
        acc[input.id] = input.value;
        return acc 
 }, {});
////////////CONTINUE WHERE I LEFT OFFFFFFF 
    // this querySelector targets the select element that holds two
    // options 'read' 'unread'
    let stat = document.querySelector('#libform select');
    // options property of select/ or 'select object collection'
    // returns a collection of all the options is a drop down
    // list; selectedIndex returns the index of the selected 
    // option then the option and value property
    let value = stat.options[stat.selectedIndex].value;
    // added the value of the property status

    // no prototypal inheritance chain is being used in this doc
    // we are simply creating a new object in newBook and
    // assigning new propertys to the object

    newBook.status = value;
// calling function addBook with parameter newBook
// wich adds the object in newBook to the myLibrary array
    addBook(newBook);
// targets the table element with its id; which holds the table
// heading row and the table row with the hold classes
    let table = document.getElementById('table');
// creates a new row and inserts it at the end of the
// table rows
    let newRow = table.insertRow(table.length);
// gives the new tr tage an id with value of title
    newRow.setAttribute('id', `${newBook.title}`)
// create all the cells in the new row
    let t = newRow.insertCell(0);
    let a = newRow.insertCell(1);
    let p = newRow.insertCell(2);
    let s = newRow.insertCell(3);
    let change = newRow.insertCell(4);
    let del = newRow.insertCell(5);
// give status cell an id with a value of a random number
    s.setAttribute('id', Math.random());
//give delete cell an class with a value of remove
    del.setAttribute('class', 'remove');
//give change cell a class with value switch
    change.setAttribute('class', 'switch');
// assign property of new book to these key words/variables
    let title = newBook.title;
    let author = newBook.author;
    let pages = newBook.pages;
    let status = newBook.status;
//giving my cells an innerHTML with the variable created uptop
    t.innerHTML = `${title}`;
    a.innerHTML = `${author}`;
    p.innerHTML = `${pages}`;
    s.innerHTML = `${status}`;
    // constant innerhtml's
    change.innerHTML = 'Switch';
    del.innerHTML = 'Remove';
// calls function setAction gives the two hyperlinks 
// there respective functionality ; that being remove and switch
    setActions();
    // method, of form that will reset all the inmputs
    form.reset();
}


//this adds event listeners to each "remove" and "switch" 
// element in the table: as they are being created

function setActions () {
// sets a pointer to all class name remove, after the row has bin
// created
    let rem = document.getElementsByClassName('remove');
    
// sets a pointer to all class name switch, after the row has bin
// created
    let ch = document.getElementsByClassName('switch');
// goes through the array of table data object class's switch
    for(let y = 0; y < ch.length; y++){
// adds en event listener to each table data and listens to
// a click: calling change function
        ch[y].addEventListener('click', change);
    }
// iterates through the array of table data objects class's remove
    for(let i = 0; i < rem.length; i++){
// adds and event listener to each table data and listens to 
// a click: calling remove function
        rem[i].addEventListener('click', remove);
    }
}



























// let myLibrary = [];

// // what did i do? 
// // created an object constructor
// function book(title, author, pages, language, datePublished){
//     this.title =  title,
//     this.author = author,
//     this.pages = pages,
//     this.language = language,
//     this.datePublished = datePublished
//     // the constructor
// }

// // what did i do?
// // created an onject instance
// const ben = new book('autobiography of benjamin franklin', 
// 'benjamin frankin', 111, 'english', 1610);


// function addBookToLibrary(){
//     //if new object prototype push to array
//     for(let i = 0; i <= myLibrary.length; i++){
//         return myLibrary.push(//newly created objects)

//     }
// }

// console.log(addBookToLibrary())
// console.log(myLibrary);


