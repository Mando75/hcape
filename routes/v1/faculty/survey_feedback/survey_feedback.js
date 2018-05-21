import express from 'express';
import {axiosQualtrics} from "../../../../resolvers/qualtrics";

const router = express.Router();
const sanitzer = require('sanitizer').sanitize;
/**
 * Router for creating and fetching export status
 * updates from Qualtrics
 */
router.route('/export/:id')
    .get(async (req, res) => {
        try {
          const export_id = sanitzer(req.params.id);

          // Only return data.result from the Qualtrics API call
          const qualResp = (await axiosQualtrics.get(`/responseexports/${export_id}`)).data.result;
          res.json(qualResp);
        } catch ({response}) {
            console.log(response);
            res.status(response.status).send(response.statusText)
        }
    })
    .post(async (req, res) => {
        const survey_id = sanitzer(req.params.id);
        try {
          /**
           * Post request. We want the export in JSON format
           * Extract only the resulting export id
           */
          const exportId = (await axiosQualtrics.post('/responseexports/', {
            format: 'json',
            surveyId: survey_id
          })).data.result.id;

          res.json({exportId: exportId});
        } catch ({response}) {
            console.log(response);
            res.status(response.status).send(response.statusText);
        }
    });

// TODO complete import route
router.route('/export/:export_id/import')
    .get(async (req, res) => {
       const export_id = sanitzer(req.params.export_id);
       res.send(export_id);
    });

export {router};