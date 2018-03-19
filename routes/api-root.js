import express from 'express';
const router = express.Router();
import {router as s} from './s';
import {authRouter} from "./auth/auth";

router.get('/', (req, res, next) => {
  console.log('api-root');
  const message = {
    message: 'api root'
  };

  res.json(message);
});

router.use('/auth', authRouter);

router.use('/s', s);

export {router}

