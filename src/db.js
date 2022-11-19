let db = null;

export const initDB = () =>
  new Promise((resolve, reject) => {
    let openRequest = indexedDB.open("booksDb", 1);

    openRequest.onerror = function (e) {
      reject(e);
    };

    openRequest.onupgradeneeded = () => {
      db = openRequest.result;
      db.createObjectStore("books", { keyPath: "name" });

      const tx = openRequest.result.transaction;
      tx.oncomplete = () => {
        resolve(true);
      };
    };

    openRequest.onsuccess = () => {
      db = openRequest.result;
      resolve(true);
    };
  });

export const addBook = (book) =>
  new Promise((resolve, reject) => {
    const tx = db.transaction("books", "readwrite");
    const books = tx.objectStore("books");
    const req = books.add(book);

    req.onsuccess = () => {
      resolve();
    };

    req.onerror = () => {
      if (req.error.name == "ConstraintError") {
        reject("Такая книга уже существует");
      }
    };
  });

export const removeBook = async (name) => {
  const tx = db.transaction("books", "readwrite");
  const books = tx.objectStore("books");
  const req = books.delete(name);

  req.onerror = () => {
    if (req.error) {
      alert("Упс! Что - то пошло не так, книга не удалилась в хранилище");
    }
  };
};

export const editBook = async (book) => {
  const tx = db.transaction("books", "readwrite");
  const books = tx.objectStore("books");
  const req = books.put(book);

  req.onerror = () => {
    if (req.error) {
      alert("Упс! Что - то пошло не так, книга не отредактирована в хранилище");
    }
  };
};

export const getBooks = () =>
  new Promise((resolve, reject) => {
    const tx = db.transaction("books");
    const bookStore = tx.objectStore("books");
    const req = bookStore.getAll();

    req.onsuccess = () => {
      resolve(req.result);
    };

    req.onerror = () => {
      reject(req.error);
    };
  });
