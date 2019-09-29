const fs = require('fs');
const path = require('path');
const program = require('commander');


const readDir = require('./self_modules/readDir');
const zipper = require('./self_modules/zipper');
program
  .option('-f, --from <from>', 'расположение файлов', './sources')
  .option('-t, --to <to>', 'куда перенести файлы?', './result')
  .option('-d, --del <del>', 'Удалять исходники?', false);
program.parse(process.argv);

const dir = {base: program.from, direction: program.to};

(async ()=>{
  await readDir(dir.base, dir.direction, program.del);
  await zipper(dir.direction, './', 'total');
})();
