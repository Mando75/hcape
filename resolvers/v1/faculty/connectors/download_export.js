import {axiosQualtrics} from "../../../qualtrics";
import path from 'path';
import fs from 'fs';

export async function downloadExport(export_id) {
    const downloadPath = path.resolve(appRoot, 'exports', `${export_id}.zip`);
    try {
        const resp = await axiosQualtrics.get(`/responseexports/${export_id}/file`, {
            responseType: 'stream'
        });
        resp.data.pipe(fs.createWriteStream(downloadPath));

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