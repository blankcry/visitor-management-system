const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const functions = require('./functions/index');
const db = require('../models/index');
genrateToken = (data) => {
  return jwt.sign({
    iss: 'admin',
    sub: data.id,
    username: data.username,
    admin: data.account_role === 1 ? true : false,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);
};


exports.login = async (request, response, next) => {
  const { username, password } = request.body;
  // SearchDatabase function searches a database by a paramenter (searchField), it takes 3 parameters, Table Name, The field to search and the information to search
  // It then returns a user object if its found
  functions.searchDatabase(process.env.ACCOUNTDB, 'username', username).then((user) => {
    if (!user) {
      next(new Error('Invalid Username'))
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = genrateToken(user)
          response.status(200).json({user,token})
        } else {
          next({ message: 'Invalid Password', status: 401, err });
        };
      });
    };
  }).catch(err => {
    next(err)
  });
};

// Asynchrous function that inputs default data into the database, the user created from this is a default user that can be deleted when you create a new admin user.
exports.register = async (request, response, next) => {
  // SearchDatabase function searches a database by a paramenter (searchField), it takes 3 parameters, Table Name, The field to search and the information to search
  // It then returns a user object if its found
  functions.searchDatabase(process.env.ACCOUNTDB, "username", "admin.admin").then(user => {
    if (user) {
      next(new Error("username already exists"))
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("password1234", salt, (err, hash) => {
          db(process.env.ACCOUNTDB).insert({
            first_name: "admin",
            last_name: "admin",
            username: "admin.admin",
            password: hash,
            account_role: 1
          }, '*')
            .then((data) => {
              response.status(200).json({
                message: `An account for ${data[0].first_name} ${data[0].last_name}, with username: ${data[0].username} has been created`
              })
            })
            .catch(err => {
              switch (err.code) {
                case "2P02":
                  next(new Error("Input all fields"))
                default:
                  next(new Error("Please try contacting database administrator"))
              }
            })
        });
      });
    }
  });
};
