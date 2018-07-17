/**
 * @author Bryan Muller
 * This file contains functions used
 * to unzip export files
 */

import unzip from 'unzip';
import path from 'path';

const fs = require('fs');


/**
 * Given an export_id, will unzip the export and
 * save it in a folder named with the export_id
 * @param exportId
 * @returns {Promise<any>}
 */
export function unzipExport(exportId) {
  // define directory path for the unzipped export
  const dir = path.resolve(appRoot, `exports/${exportId}`);

  // Initialize a file stream for the zip file
  const fileStream = fs.createReadStream(dir + '.zip');

  return new Promise((resolve, reject) => {
    // Array of filenames we have unzipped
    let filenames = [];

    // pipe the zip stream to unzip. For documentation:
    // https://www.npmjs.com/package/unzip
    fileStream.pipe(unzip.Parse()).on('entry', entry => {
      // add the filename to the array
      filenames.push(entry.path);
      // Functionally check if the dir has already been created
      mkdir(dir);

      // Write the unzipped entry to the directory path
      entry.pipe(fs.createWriteStream(path.resolve(dir, `${entry.path}`)));
    }).on('close', () => {
      // When finished, delete the original zip file
      try {
        removeFile(dir + '.zip');
      } catch (removeFileErr) {
        console.log("Could not delete import ZIP file", removeFileErr);
      }
      // Resolve the promise returning the filenames
      resolve(filenames)
    }).on('error', e => {
      reject(e)
    });
  });
}

/**
 * Checks if a directory already exists. If it does not, create it
 * @param dir
 */
const mkdir = (dir) => {
  fs.access(dir, (err) => {
    if (err && err.code === 'ENOENT') {
      fs.mkdirSync(dir)
    }
  })
};

/**
 * Removes a file from the provided path.
 * @param path
 */
const removeFile = (path) => {
  fs.unlink(path, err => {
    if (err) throw err;
    console.log(`${path} was deleted`)
  })
};


