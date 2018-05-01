import express from 'express';
import {axiosQualtrics} from "../../lib/qualtrics";
import {parse_survey_meta, parse_survey_questions} from "../../lib/parse_survey";
import {fetch_qualtrics_survey_data} from "../../resolvers/qualtrics_api/fetch_survey";
import {connectToDb, COLLECTIONS, mongoId} from "../../resolvers/mongodb-connection";

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
    const survey = await fetch_qualtrics_survey_data(survey_id);
    res.status(survey.status).json(survey.data || survey.error);
});

surveyImportRouter.post('/survey/:survey_id', async (req, res) => {
    const auth = req.authpayload;
    const survey_id = sanitize(req.params.survey_id);
    const conn = await connectToDb(COLLECTIONS.FACULTY);
    try {
        const survey = (await axiosQualtrics.get(`/surveys/${survey_id}`)).data;
        const parsedSurvey = {
            meta: parse_survey_meta(survey.result),
            questions: parse_survey_questions(survey.result)
        };

        //TODO write resolver function to import into database.

        const teach = await conn.findOneAndUpdate({_id: mongoId(auth._id)},
            {$push: { surveys: parsedSurvey }}, {returnNewDocument: true, returnOriginal: false});
        const resp = {
          status: teach.lastErrorObject.updatedExisting ? 200 : 500,
          data: teach.value,
        };
        res.status(resp.status).json(resp);
    } catch (error) {
        res.status(401).send(error.response.statusText);
    }

});

export {surveyImportRouter}