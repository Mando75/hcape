import express from 'express';
import {axiosQualtrics} from "../../lib/qualtrics";
import {parse_survey_meta, parse_survey_questions} from "../../lib/parse_survey";
import {fetch_qualtrics_survey_data} from "../../lib/qualtrics_api/fetch_survey";

const sanitize = require('sanitizer').sanitize;
const {check, validatonResult} = require('express-validator');
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
 */
surveyImportRouter.get('/survey/:survey_id', async (req, res) => {
  const survey_id = sanitize(req.params.survey_id);
  const survey = fetch_qualtrics_survey_data(survey_id);
  res.status(survey.status).json(survey.data);
});

surveyImportRouter.post('/survey/:survey_id', async (req, res) => {
  const survey_id = sanitize(req.params.survey_id);
  //TODO Use fetch_qualtrics_survey
    const survey = (await axiosQualtrics.get(`/surveys/${survey_id}`)).data;
    const parsedSurvey = {
      meta: parse_survey_meta(survey.result),
      questions: parse_survey_questions(survey.result)

    //TODO write resolver function to import into database.
  }
});

export {surveyImportRouter}