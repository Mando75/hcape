/**
 * @author Bryan Muller
 */
import express from 'express';
import {axiosQualtrics} from "../../../resolvers/qualtrics";
import {parseSurveyMeta, parseSurveyQuestions} from "../../../resolvers/v1/faculty/helpers/parse_survey";
import {getQualtricsSurvey} from "../../../resolvers/v1/faculty/connectors/fetch_survey";
import {saveQualtricsSurvey} from "../../../resolvers/v1/faculty/connectors/save_survey";
import {deleteQualtricsSurvey} from "../../../resolvers/v1/faculty/connectors/delete_survey";

const sanitize = require('sanitizer').sanitize;
const router = express.Router();

/**
 * uses the Qualtrics api to fetch survey data.
 * This data includes the survey name, question data, etc.
 * GET: Fetch from Qualtrics, send to user
 * POST: Fetch from Qualtrics, save in Database, send result to user
 * DELETE: Remove from database
 */
router.route('/:survey_id')
    /**
     * GET
     * */
    .get(async (req, res) => {
      const survey_id = sanitize(req.params.survey_id);
      const survey = await getQualtricsSurvey(survey_id);
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
          meta: parseSurveyMeta(survey.result),
          questions: parseSurveyQuestions(survey.result),
        };
        const resp = await saveQualtricsSurvey(parsedSurvey, mongoId(auth._id));
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
      const user_id = req.authpayload._id;
      try {
        const updateMsg = await deleteQualtricsSurvey(survey_id, mongoId(user_id));
        const resp = updateMsg.nModified ? {status: 200, msg: "Update successful"}
            : {status: 400, msg: "No updates were made"};
        res.status(resp.status).json(resp);
      } catch (e) {
        res.status(500).json({msg: "An unexpected error occurred"})
      }
    });
export {router}
