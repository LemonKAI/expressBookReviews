const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Find the user with the provided username
  // Assuming you have a users data source or database
  const user = users.find((user) => user.username === username);

  // Check if the user exists and the password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT for the session
  const token = jwt.sign(
    { username },
    'fingerprint_customer' // Replace with your own secret key for signing the token
  );;

  // Return the JWT token as a response
  return res.status(200).json({ token , username});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.body.username;

  if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
    // Modify the existing review
    books[isbn].reviews[username] = review;
    const reviews = books[isbn].reviews
    return res.status(200).json({ message: "Review modified successfully" , 'reviews': reviews});
  } else {
    // Add a new review
    
    books[isbn].reviews[username] = review;
    const reviews = books[isbn].reviews
    return res.status(201).json({ message: "Review added successfully" , 'reviews': reviews});
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.body.username; // Assuming the username is stored in the session
  
    // Check if a review exists for the provided ISBN and username
    if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
      // Delete the review
      delete books[isbn].reviews[username];
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
