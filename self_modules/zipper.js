const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const archive = archiver.create('zip', {});
const zipper = (file, dest, name) =>{

  const ws = fs.createWriteStream(path.join(dest, `${name}.gz`));

  archive.on('error', function(err){
    throw err;
  });

  ws.on('close', function() {
    console.log(`
    Архивация завершена успешно. Сводка:
    ${archive.pointer()} - размер архива в байтах
    ${name}.gz - Имя архива
    `);

  });

  archive.pipe(ws);
  archive.directory(file);
  archive.finalize();
};

module.exports = zipper;
