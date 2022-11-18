import createBookElement from "./createBookElement";
import { addBook, getBooks, initDB } from "./db";
import convertToUtf8 from "./helpers/convertToUtf8";
import uniqueLogin from "./helpers/uniqueLogin";
import renderBooks from "./renderBooks";

// Радио элементы которые будут менять состояние формы на форму с загрузкой и форму с полем ввода
const downloadRadioElement = document.getElementById("download");
const writeRadioElement = document.getElementById("write");

const form = document.getElementById("book-form");

const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionTitle");
const fileInput = document.getElementById("file");

export const allBooksList = document.getElementById("books-list");
export const favouriteBooksList = document.getElementById("books-favourite");

// Генерируем уникальный логин и сохраняем в ls. Он потребуется при отправке формы
if (!localStorage.getItem("lib-login")) {
  localStorage.setItem("lib-login", uniqueLogin());
}

export const getAllBooks = async () => {
  favouriteBooksList.innerHTML = "";
  allBooksList.innerHTML = "";
  const isDbReady = await initDB();
  if (isDbReady) {
    const books = await getBooks();
    console.log("All books", books);
    renderBooks(books);
  }
};

getAllBooks();

downloadRadioElement.addEventListener("change", () => {
  form.classList.add("download");
  form.classList.remove("write");
});

writeRadioElement.addEventListener("change", () => {
  form.classList.add("write");
  form.classList.remove("download");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("login", localStorage.getItem("lib-login"));

  if (form.classList.contains("write")) {
    const file = new File([descriptionInput.value], titleInput.value, {
      type: "text/plain",
    });
    formData.append("file", file);
  } else {
    formData.append("file", fileInput.files[0]);
  }

  let response = await fetch("https://apiinterns.osora.ru/", {
    method: "POST",
    body: formData,
  });

  let result = await response.json();

  console.log(result);

  const book = {
    name: result.title.replace(/\.[^/.]+$/, ""),
    text: convertToUtf8(result.text),
    isRead: false,
    isFavorite: false,
    date: new Date(),
  };

  addBook(book);
  createBookElement(book);
});
