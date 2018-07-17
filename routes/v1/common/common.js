/**
 * @author Bryan Muller
 */
import express from 'express';

const router = express.Router();

/**
 * API Common root
 */
router.get('/', (req, res) => {
  res.json({
    message: 'common root'
  });
});

export {router};
