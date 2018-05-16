import express from 'express';
import {axiosQualtrics} from "../../../lib/qualtrics";
import {parse_survey_meta, parse_survey_questions} from "../../../lib/parse_survey";
import {fetch_qualtrics_survey_data} from "../../../resolvers/survey_import/fetch_survey";
import {delete_survey} from "../../../resolvers/survey_import/delete_survey";
import {save_survey} from "../../../resolvers/survey_import/save_survey";

const sanitize = require('sanitizer').sanitize;
const surveyImportRouter = express.Router();


surveyImportRouter.post('/export', (req, res) => {

});

surveyImportRouter.get('/export/status', (req, res) => {

});

surveyImportRouter.get('/:response_id', (req, res) => {

});

/**
 * uses the Qualtrics api to fetch survey data.
 * This data includes the survey name, question data, etc.
 * GET: Fetch from Qualtrics, send to user
 * POST: Fetch from Qualtrics, save in Database, send result to user
 * DELETE: Remove from database
 */
surveyImportRouter.route('/survey/:survey_id')
/**
 * GET
 * */
    .get(async (req, res) => {
      const survey_id = sanitize(req.params.survey_id);
      const survey = await fetch_qualtrics_survey_data(survey_id);
      res.status(survey.status).json(survey.data || survey.error);
    })
    /**
     * POST
     */
    .post(async (req, res) => {
      const auth = req.authpayload;
      const survey_id = sanitize(req.params.survey_id);
      try {
        const survey = (await axiosQualtrics.get(`/surveys/${survey_id}`)).data;
        const parsedSurvey = {
          meta: parse_survey_meta(survey.result),
          questions: parse_survey_questions(survey.result),
        };

        const resp = await save_survey(parsedSurvey, mongoId(auth._id));
        res.status(resp.status).json(resp);

      } catch (error) {

        console.log(error.response);
        res.status(error.response.status).send(error.response.statusText);
      }

    })
    /**
     * DELETE
     */
    .delete(async (req, res) => {
      const survey_id = sanitize(req.params.survey_id).trim();
      const user_id = req.authpayload._id
      try {
        const updateMsg = await delete_survey(survey_id, mongoId(user_id));
        const resp = updateMsg.nModified ? {status: 200, msg: "Update successful"}
            : {status: 400, msg: "No updates were made"};
        res.status(resp.status).json(resp);
      } catch (e) {
        res.status(500).json({msg: "An unexptected error occurred"})
      }
    });
export {surveyImportRouter}