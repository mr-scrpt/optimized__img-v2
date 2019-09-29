const fs = require('fs');

const access = (check) => {
  return new Promise((resolve) => {
    fs.access(check, err => {
      err && err.code === 'ENOENT' ? resolve(true) :  resolve(false);
    })
  })

};

module.exports = access;




