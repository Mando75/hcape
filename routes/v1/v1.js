import express from 'express';
import {router as authRouter} from './auth/auth';
import {router as adminRouter} from './admins/admins';
import {router as commonRouter} from './common/common';
import {router as devRouter} from './developers/developers';
import {router as facultyRouter} from './faculty/faculty';
import {router as studentRouter} from './students/student';

const passport = require('passport');
const auth = passport.authenticate('jwt', {session: false});
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api v1 root'
  });
});

router.use('/auth', authRouter);
router.use('/admins', auth, adminRouter);
router.use('/common', auth, commonRouter);
router.use('/dev', auth, devRouter);
router.use('/faculty', auth, facultyRouter);
router.use('/students', auth, studentRouter);

export {router};
