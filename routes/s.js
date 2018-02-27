import express from 'express';
const router = express.Router();

router.get('/:orgid', (req, res) => {
  res.json({
    message: 'this is a message',
    orgid: req.params.orgid
  });
});

export {router};