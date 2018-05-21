import express from 'express';
import {router as surveyDataRouter} from './survey_data/survey_data';
import {router as feedbackRouter} from './survey_feedback/survey_feedback';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'faculty root'
  });
});

router.use('/surveys', surveyDataRouter);
router.use('/feedback', feedbackRouter);

export {router};
