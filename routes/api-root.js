import express from 'express';
const router = express.Router();
import {authRouter} from "./auth/auth";
import {surveyImportRouter} from "./survey_import/survey_import";
const passport = require('passport');

const auth = passport.authenticate('jwt', {session: false});

router.get('/', (req, res) => {
  const message = {
    message: 'api root'
  };

  res.json(message);
});

router.use('/auth', authRouter);
router.use('/survey_import', auth, surveyImportRouter);


export {router}

