const bcrypt = require('bcrypt');
const saltRounds = 10

const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          resolve({ hash, salt });
        });
      });
    });
  };


  module.exports = hashPassword