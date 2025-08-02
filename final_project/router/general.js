const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/*
let prompt = require('prompt-sync')();
let fs = require('fs');
*/

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        
        if (!doesExist(username)) {
            
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
     return res.status(404).json({message: "Unable to register user."});
});

const doesExist = (username) => {
    
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    
    if (userswithsamename.length > 0) 
        return true;
    else 
        return false;
    
}

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
    
let author = req.params.author;

for (let index = 1; index <= author.length; index++) {
    if (author.charAt(index) === "_") {
        author = author.replace("_"," ");
    }
}

let book = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());


res.send(JSON.stringify(book)); 

});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    let title = req.params.title;

    
    for (let index = 1; index <= title.length; index++) {
        if (title.charAt(index) === "_") {
            title = title.replace("_"," ");
        }
    }

        
   
    let bookDetails = Object.values(books).filter(bookDetails => bookDetails.title.toLowerCase() === title.toLowerCase());
res.send(JSON.stringify(bookDetails)); 
});

public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    
      res.send(JSON.stringify(books[isbn].reviews));
    
  });

module.exports.general = public_users;
