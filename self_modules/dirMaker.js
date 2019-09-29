const fs = require('fs');
const {promisify} = require('util');
const mkdir =  promisify(fs.mkdir);
const access = require('./access');

const dirMaker = async (target, base) => {
  const existTarget = await access(target);
  const existBase = await access(base);

  return new Promise((resolve, reject) => {
    const baseDir = new Promise(( async (resolve, reject) => {
      if(existBase){
        //fs.mkdir(base, err => err ? reject(err) : resolve())
        await mkdir(base);
      }
      resolve()
    }));

    const targetDir = new Promise(( async (resolve, reject) => {
      if(existTarget){
        //fs.mkdir(target, err => err ? reject(err) : resolve())
        await mkdir(target);
      }
      resolve()
    }));

    Promise.all([baseDir, targetDir])
      .then(()=> resolve())
      .catch(err=> reject(err))
  })

};


module.exports = dirMaker;