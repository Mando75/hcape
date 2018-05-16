import express from 'express';
import {router as surveyDataRouter} from './survey_data/survey_data';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'faculty root'
  });
});

router.use('/surveys', surveyDataRouter);

export {router};
