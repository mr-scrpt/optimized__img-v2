const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);

const copyFile = require('./copyFile');
const getFirsLiters = require('./getFirstLiters');
const dirMaker = require('./dirMaker');

const readDir = async(base, dest, del = false) => {

  try {
    let list = await readdir(base);

    for await (const it of list){
      const targetPath = path.join(base, it);
      const stats = await stat(targetPath);

      if(stats && stats.isDirectory()){
        await readDir(targetPath, dest, del);
        del === 'true' ? await rmdir(targetPath) : null;
      }else {

        const firstLater = getFirsLiters(it);
        const destDir = path.join(dest, firstLater);
        const destFile = path.join(destDir, it);
        await dirMaker(destDir, dest);

        const name = await copyFile(targetPath, destFile);
        console.log(`Файл ${name} скопирован успешно`);
        del === 'true' ? await unlink(targetPath) : null;
      }

    }
  }catch (err) {
    throw new Error(err);
  }

};
module.exports = readDir;