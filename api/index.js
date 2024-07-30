const express = require("express");
const cors = require("cors");
const booksData = require("./data/books.json");

const app = express();

app.use(cors());

const getRandomBook = () => {
  return booksData[Math.floor(Math.random() * booksData.length)];
};

app.get("/random-book", (req, res) => {
  res.send(getRandomBook());
});

app.get("/random-book-delayed", (req, res) => {
  setTimeout(() => res.send(getRandomBook()), 2000);
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
