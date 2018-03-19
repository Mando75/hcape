import express from 'express';
const router = express.Router();
import {authRouter} from "./auth/auth";

router.get('/', (req, res, next) => {
  const message = {
    message: 'api root'
  };

  res.json(message);
});

router.use('/auth', authRouter);


export {router}

