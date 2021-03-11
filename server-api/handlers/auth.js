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
  functions.searchDatabase(process.env.ACCOUNTDB, 'username', username).then((user) => {
    if (!user) {
      next(new Error('Invalid Username'))
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = genrateToken(user)
          response.json({
            user,
            token
          })
        } else {
          next({ message: 'Invalid Password', status: 401, err });
        };
      });
    };
  }).catch(err => {
    next(err)
  });
};

exports.register = async (request, response, next) => {
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
