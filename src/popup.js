import { addBook, removeBook } from "./db";

const popupOverlay = document.querySelector(".popup-overlay");
const popupHeader = document.getElementById("edit-header");
const popupText = document.getElementById("edit-text");
const popupSubmitBtn = document.getElementById("edit-submit");

let bookElement = null;
let bookData = null;

const editPopup = (book, bookEl) => {
  popupOverlay.classList.add("visible");
  popupHeader.value = book.name;
  popupText.value = book.text;
  bookElement = bookEl;
  bookData = book;
};

popupSubmitBtn.onclick = () => {
  popupOverlay.classList.remove("visible");
  bookElement.querySelector("h4").innerText = popupHeader.value;
  const originalBookData = { ...bookData };
  if (popupHeader.value === "" || popupText.value === "") {
    alert("Для начала заполните заголовок и описание книги");
    return;
  }
  bookData.name = popupHeader.value;
  bookData.text = popupText.value;
  removeBook(originalBookData.name);
  addBook(bookData);

  document.getElementById("show-title").innerText = "";
  document.getElementById("show-window").innerText = "";
};

popupOverlay.onclick = (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("visible");
  }
};

export default editPopup;
