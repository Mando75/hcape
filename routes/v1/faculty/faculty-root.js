/**
 * @author Bryan Muller
 */
import express from 'express';
import {router as surveyDataRouter} from './survey_data';
import {router as feedbackRouter} from './survey_feedback';
const router = express.Router();

/**
 * Root for the faculty branch
 */
router.get('/', (req, res, next) => {
  res.json({
    message: 'faculty root'
  });
});

router.use('/surveys', surveyDataRouter);
router.use('/feedback', feedbackRouter);

export {router};
