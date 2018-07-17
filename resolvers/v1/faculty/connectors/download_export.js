import {axiosQualtrics} from "../../../qualtrics";
import path from 'path';
import fs from 'fs';

/**
 * Downloads response export from Qualtrics.
 * Unzips the downloaded zip and returns the path
 * of the downloaded export
 * @param export_id
 * @returns {Promise<*>}
 */
export async function downloadExport(export_id) {
  // resolve download path for response export
  const downloadPath = path.resolve(appRoot, 'exports', `${export_id}.zip`);
  try {
    // fetch the zip file from Qualtrics
    const resp = await axiosQualtrics.get(`/responseexports/${export_id}/file`, {
      responseType: 'stream'
    });
    // Pipe download stream to the filesystem
    resp.data.pipe(fs.createWriteStream(downloadPath));

    // Resolve promise with the download path
    return new Promise((resolve, reject) => {
      resp.data.on('end', () => resolve(downloadPath));
      resp.data.on('error', e => reject(e));
    });
  } catch (e) {
    const err = new Error();
    err.message = e.response.statusText;
    err.code = e.response.status;
    return Promise.reject(err);
  }


}