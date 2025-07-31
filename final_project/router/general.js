const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({username, password});
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

//  Get book review



public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    
    res.send(JSON.stringify());
});

module.exports.general = public_users;
