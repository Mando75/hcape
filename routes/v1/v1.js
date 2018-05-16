import express from 'express';
import
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api v1 root'
  });
});



export {router};