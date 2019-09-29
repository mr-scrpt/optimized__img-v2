const fs = require('fs');
const gm = require('gm');

const copyFile = (target, dest) =>{

  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(target);
    rd.on('error', err => reject(err));

    const wr = fs.createWriteStream(dest);
    wr.on('error', err => reject(err))
      .on('close', () => {
        resolve(target);
      });

    gm(rd)
      .resize('200', '200')
      .stream(function (error, stdout, stderr) {
        stdout.pipe(wr);
      });

  })

};

module.exports = copyFile;