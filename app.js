// Book Constructor
class Book {
  constructor(id, title, author, isbn) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {

  addBook(book) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <tr>
        <td class="nav-item">${book.id}</td>
        <td class="nav-item">${book.title}</td>
        <td class="nav-item">${book.author}</td>
        <td class="nav-item">${book.isbn}</td>
        <td class="btn btn-sm btn-danger"><a href="#" class="text-white">X</a></td>    
      </tr>        
    `;
    const getTr = document.getElementById('tr');
    getTr.appendChild(tr);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = className;
    const showAlert = document.querySelector('.showAlert');
    div.appendChild(document.createTextNode(message));
    showAlert.appendChild(div);

    setTimeout(function () {
      div.remove();
    }, 2000);
  }

  clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('id').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}


class StoreLocal {

  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(book) {
    const books = StoreLocal.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBook() {
    const books = StoreLocal.getBook();
    books.forEach(function (book) {
      const ui = new UI();
      ui.addBook(book);
    });
  }

  static deleteBook(isbn) {
    const books = StoreLocal.getBook();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

}

// Add List Item
document.getElementById('create-book').addEventListener('submit', (e) => {
  const
    title = document.getElementById('title').value,
    id = document.getElementById('id').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(id, title, author, isbn);

  const ui = new UI();

  if (title === '' || id === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all the fields', 'alert alert-danger');
  } else {
    ui.addBook(book);
    ui.showAlert('Successful entry', 'alert alert-success');
    ui.clearInput();
    StoreLocal.storeBook(book);
  }
  e.preventDefault();
});

// Delete List Item
document.getElementById('tr').addEventListener('click', (e) => {
  const ui = new UI();
  if (e.target.innerText === 'X') {
    const target = e.target;
    ui.deleteBook(target);
    StoreLocal.deleteBook(target.parentElement.previousElementSibling.textContent);
  }
  e.preventDefault();
});

StoreLocal.displayBook();