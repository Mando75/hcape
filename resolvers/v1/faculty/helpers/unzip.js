import unzip from 'unzip';
import path from 'path';
const fs = require('fs');



export function parseZip(exportId) {
    const dir = path.resolve(appRoot, `exports/${exportId}`);
    console.log("entering zip parser");
    const fileStream = fs.createReadStream(dir + '.zip');

    let filenames = [];
    fileStream.pipe(unzip.Parse()).on('entry', entry => {
        filenames.push(entry.path);
        mkdir(dir);
        entry.pipe(fs.createWriteStream(path.resolve(appRoot, `exports/${exportId}`,`${entry.path}`)))
    });

    return new Promise((resolve, reject) => {
       fileStream.on('end', () => {removeZip(dir + '.zip'); resolve(filenames)});
       fileStream.on('error', e => reject(e));
    });
}

const mkdir = (dir) => {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
};

const removeZip = (path) => {
  fs.unlink(path, err => {
      if (err) throw err;
      console.log(`${path} was deleted`)
  })
};

