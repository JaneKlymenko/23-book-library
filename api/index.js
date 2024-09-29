const express = require("express");
const cors = require("cors");
const bookData = require("./data/books.json");

const app = express();

app.use(cors());

app.get("/random-book", (req, res) => {
  const randomIndex = Math.floor(Math.random() * bookData.length);
  const randomBook = bookData[randomIndex];
  res.json(randomBook);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
