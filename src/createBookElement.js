import { editBook, removeBook } from "./db";
import { allBooksList, favouriteBooksList } from "./main";
import editPopup from "./popup";

const isReadText = "ПРОЧИТАЛ";
const isNotReadText = "ПРОЧИТАНА";

let draggedElement = null;
let draggedElementData = null;

const createBookElement = (book) => {
  const bookElement = document.createElement("li");
  const bookName = document.createElement("h4");

  const editBtn = document.createElement("button");
  const checkIsReadBtn = document.createElement("button");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookName.innerText = book.name;

  editBtn.innerText = "Ред.";
  checkIsReadBtn.innerText = book.isRead ? isReadText : isNotReadText;
  checkIsReadBtn.style.opacity = book.isRead ? ".5" : "1";

  readBtn.innerText = "Читать";
  removeBtn.innerText = "X";

  bookElement.append(bookName);
  bookElement.append(editBtn);
  bookElement.append(checkIsReadBtn);
  bookElement.append(readBtn);
  bookElement.append(removeBtn);

  checkIsReadBtn.onclick = () => {
    const isRead = book.isRead;
    editBook({ ...book, isRead: !isRead });
    if (checkIsReadBtn.innerText === isReadText) {
      checkIsReadBtn.innerHTML = isNotReadText;
      checkIsReadBtn.style.opacity = "1";
    } else {
      checkIsReadBtn.innerHTML = isReadText;
      checkIsReadBtn.style.opacity = ".5";
    }
  };

  readBtn.onclick = () => {
    document.getElementById("show-title").innerText = book.name;
    document.getElementById("show-window").innerText = book.text;
  };

  editBtn.onclick = () => editPopup(book, bookElement);

  removeBtn.onclick = () => {
    removeBook(book.name);
    bookElement.remove();
  };

  if (book.isFavorite) {
    favouriteBooksList.append(bookElement);
  } else {
    allBooksList.append(bookElement);
  }

  bookElement.draggable = true;

  bookElement.ondragstart = (e) => {
    draggedElement = bookElement;
    draggedElementData = book;
  };
};

const dragOver = (e) => {
  e.preventDefault();
  e.target.classList.add("dragover");
};

const dragLeave = (e) => {
  e.preventDefault();
  e.target.classList.remove("dragover");
};

// Когда бросаем элемент на любимые книги
const favoriteDroppable = document.getElementById("favorite-droppable");
favoriteDroppable.ondragover = dragOver;
favoriteDroppable.ondragleave = dragLeave;

favoriteDroppable.ondrop = (e) => {
  e.preventDefault();
  favoriteDroppable.classList.remove("dragover");
  if (!draggedElementData.isFavorite) {
    favouriteBooksList.append(draggedElement);
    draggedElementData.isFavorite = true;
    editBook(draggedElementData);
  }
  draggedElement = null;
  draggedElementData = null;
};

// Когда бросаем элемент на список всех книг
const allBooksDroppable = document.getElementById("books-list-droppable");
allBooksDroppable.ondragover = dragOver;
allBooksDroppable.ondragleave = dragLeave;

allBooksDroppable.ondrop = (e) => {
  e.preventDefault();
  allBooksDroppable.classList.remove("dragover");
  if (draggedElementData.isFavorite) {
    allBooksList.append(draggedElement);
    draggedElementData.isFavorite = false;
    editBook(draggedElementData);
  }
  draggedElement = null;
  draggedElementData = null;
};

export default createBookElement;
