/**
 * @author Bryan Muller
 */
import express from 'express';
const router = express.Router();
import {router as v1} from './v1/v1';

/**
 * Api root path
 */
router.get('/', (req, res) => {
  res.json({
    message: 'api root'
  });
});

router.use('/v1', v1);


export {router}

