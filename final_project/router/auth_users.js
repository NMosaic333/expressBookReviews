const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();

let users = []; // in-memory store (demo only)

const SECRET_KEY = "your_secret_key";

// check if username exists
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// check username + password match
const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};

// login route
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token
  });
});

module.exports = { regd_users, isValid, authenticatedUser };
