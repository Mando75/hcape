import express from 'express';
const router = express.Router();
import {router as v1} from './v1/v1';
import {authRouter} from "./v1/auth/auth";
import {surveyImportRouter} from "./v1/survey_import/survey_import";
const passport = require('passport');

const auth = passport.authenticate('jwt', {session: false});

router.get('/', (req, res) => {
  const message = {
    message: 'api root'
  };

  res.json(message);
});

router.use('/v1', v1);
// router.use('/auth', authRouter);
// router.use('/survey_import', auth, surveyImportRouter);


export {router}

