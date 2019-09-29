const fs = require('fs');
const {promisify} = require('util');
const mkdir =  promisify(fs.mkdir);
const access = require('./access');

const dirMaker = async (target, base) => {
  const existTarget = await access(target);
  const existBase = await access(base);

  return new Promise((resolve, reject) => {
    const baseDir = new Promise(( async (resolve, reject) => {
      try{
        existBase && await mkdir(base);
        resolve()
      }catch (err) {
        reject(err)
      }
    }));

    const targetDir = new Promise(( async (resolve, reject) => {
      try {
        existTarget && await mkdir(target);
        resolve()
      }catch (err) {
        reject(err)
      }
    }));

    Promise.all([baseDir, targetDir])
      .then(()=> resolve())
      .catch(err=> reject(err))
  })

};


module.exports = dirMaker;