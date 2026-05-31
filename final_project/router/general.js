const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;

const public_users = express.Router();

let users = []; // fallback in-memory (or replace with DB later)


// REGISTER USER
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.status(201).json({ message: "User registered successfully" });
});


// GET ALL BOOKS
public_users.get("/", (req, res) => {
  return res.status(200).json(books);
});


// GET BOOK BY ISBN (id in your case)
public_users.get("/isbn/:isbn", (req, res) => {
  const book = books.find(b => b.id == req.params.isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
});


// GET BOOKS BY AUTHOR
public_users.get("/author/:author", (req, res) => {
  const result = books.filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }

  return res.status(200).json(result);
});


// GET BOOKS BY TITLE
public_users.get("/title/:title", (req, res) => {
  const result = books.filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }

  return res.status(200).json(result);
});


// GET REVIEWS OF A BOOK
public_users.get("/review/:isbn", (req, res) => {
  const book = books.find(b => b.id == req.params.isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
