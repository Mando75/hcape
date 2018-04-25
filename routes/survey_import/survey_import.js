import express from 'express';
// import axios from 'axios';
import {axiosQualtrics} from "../../lib/qualtrics";

const sanitize = require('sanitizer').sanitize;
const {check, validatonResult} = require('express-validator');
const surveyImportRouter = express.Router();


surveyImportRouter.post('/export', (req, res) => {

});

surveyImportRouter.get('/export/status', (req, res) => {

});

surveyImportRouter.get('/:response_id', (req, res) => {

});

surveyImportRouter.get('/survey/:survey_id', async (req, res) => {
  const survey_id = sanitize(req.params.survey_id);
  try {
    const survey = await axiosQualtrics.get(`/surveys/${survey_id}`);
    console.log(survey);
    res.status(200).json(survey);
  } catch (error) {
    res.status(401).json(error);
  }



});

export {surveyImportRouter}