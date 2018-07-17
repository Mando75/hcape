/**
 * @author Bryan Muller
 */
import express from 'express';

const router = express.Router();

/**
 * Root for admin branch
 */
router.get('/', (req, res, next) => {
  res.json({
    message: 'admin root'
  });
});

export {router};
