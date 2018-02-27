import express from 'express';
const router = express.Router();
import {router as s} from './s';

router.get('/', (req, res, next) => {
  console.log('api-root');
  const message = {
    message: 'api root'
  };

  res.json(message);
});

router.post('/login', (req, res) => {

});


router.use('/s', s);

export {router}

