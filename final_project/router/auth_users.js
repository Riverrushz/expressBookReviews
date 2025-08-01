const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let usernameValid = users.filter((user) => {
        
        return user.username === username;});
    
        if (usernameValid.length > 0) 
          return true;
        else 
          return false;
        
}

const authenticatedUser = (username,password)=>{ 
    let userAuth = users.filter((user) => {
        return user.username === username && user.password === password;
    });
    if (userAuth.length > 0) 
     return true;
    else 
     return false;
      
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if(!username || !password) {
        return res.status(404).json({massage: "Error logging in"});
      }
    

      if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({data: password}, "access", {expiresIn: 60 * 60});
        req.session.authorization = {
        accessToken, username
      }
      return res.status(200).send({message:"User successfully logged in"});
    } 
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;
  let book = books[isbn];

  books[isbn].reviews[username] = review;
  





});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
