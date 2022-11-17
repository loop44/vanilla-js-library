// Радио элементы которые будут менять состояние формы на форму с загрузкой и форму с полем ввода
const downloadRadioElement = document.getElementById("download");
const writeRadioElement = document.getElementById("write");

const form = document.getElementById("book-form");

downloadRadioElement.addEventListener("change", () => {
  form.classList.add("download");
  form.classList.remove("write");
});

writeRadioElement.addEventListener("change", () => {
  form.classList.add("write");
  form.classList.remove("download");
});
