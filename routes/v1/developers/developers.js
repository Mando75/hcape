/**
 * @author Bryan Muller
 */
import express from 'express';

const router = express.Router();

/**
 * Root for developer branch
 */
router.get('/', (req, res, next) => {
  res.json({
    message: 'developers root'
  });
});

export {router};
