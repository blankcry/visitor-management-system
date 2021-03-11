const bcrypt = require('bcryptjs');
const db = require('../models/index');
const functions = require('./functions/index');

exports.registerUser = async (request, response, next) => {
  try {
    functions.validUser(request.user.account_role, process.env.ADMIN_CODE);
    const { first_name, last_name, username, password, account_role, phone_number } = request.body;
    functions.validAccount(first_name, account_role, username, password);
    functions.searchDatabase(process.env.ACCOUNTDB, "username", username).then(user => {
      if (!user) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            db(process.env.ACCOUNTDB)
              .insert({ first_name, last_name, username, password: hash, account_role, phone_number }, '*')
              .then((data) => {
                response.status(200).json({
                  message: `An account for ${data[0].first_name} ${data[0].last_name}, with username: ${data[0].username} has been created`,
                });
              })
              .catch(err => {
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