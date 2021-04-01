const bcrypt = require('bcryptjs');
const db = require('../models/index');
const functions = require('./functions/index');

//Asynchronus function to register user in database, hashing password and then storing it in the database
exports.registerUser = async (request, response, next) => {
  try {
    //Validuser function is called from handlers.function module to validate if the user as proper permission to run this function
    functions.validUser(request.user.account_role, process.env.ADMIN_CODE);
    //Simple destructuring to get infromation from the post request body 
    const { first_name, last_name, username, password, account_role, phone_number } = request.body;
    // ValidAccount function which takes in user details and processes it to see if it meets the Account creation criteria
    functions.validAccount(first_name, account_role, username, password);
    // SearchDatabase function searches a database by a paramenter (searchField), it takes 3 parameters, Table Name, The field to search and the information to search
    // It then returns a user object if its found
    functions.searchDatabase(process.env.ACCOUNTDB, searchField = "username", searchFieldData = username).then(user => {
      if (!user) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            db(process.env.ACCOUNTDB)
              .insert({ 
                first_name, 
                last_name, 
                username, 
                password: hash, 
                account_role, 
                phone_number 
              }, '*').then((data) => {
                response.status(200).json({
                  message: `An account for ${data[0].first_name} ${data[0].last_name}, with username: ${data[0].username} has been created`,
                });
              }).catch(err => {
                switch (err.code) {
                  case "2P02":
                    next(new Error("Input all fields"))
                  default:
                    next(new Error("Please try contacting database administrator"))
                };
              });
          });
        });
      } else {
        next(new Error("username already exists"))
      };
    });
  } catch (error) {
    next(error)
  }
};