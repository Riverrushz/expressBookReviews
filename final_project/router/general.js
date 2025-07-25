const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books))
});

public_users.get('/isbn/:isbn',function (req, res) {
    const isbnParam = req.params.isbn
    
    res.send(JSON.stringify(books[isbnParam]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  const authorParam = req.params.author.toLowerCase();
  

 
  for (let index = 1; index < books.length; index++) {
    if (books[index].author.toLowerCase() == authorParam) {
        res.send(JSON.stringify(books[index]));
    } else{
        

    }

  }



});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
