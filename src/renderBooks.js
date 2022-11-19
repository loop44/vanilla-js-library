import createBookElement from "./createBookElement";

const renderBooks = (books) => {
  // Сначала сортируем книги по дате
  books.sort((book1, book2) => book1.date - book2.date);

  // Прочитанные книги отфильтровываем и добавляем в конец
  const notReadBooks = [];
  const readBooks = [];

  books.forEach((book) => {
    if (book.isRead) {
      readBooks.push(book);
    } else {
      notReadBooks.push(book);
    }
  });

  books = notReadBooks.concat(readBooks);

  books.forEach((book) => {
    createBookElement(book);
  });
};

export default renderBooks;
