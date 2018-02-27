import express from 'express';
const auth = express.Router();




auth.get('/', (req, res) => {
  res.json({message: 'Root Authentication Endpoint'})
});

auth.post('/login', (req, res) => {

});

export {auth};