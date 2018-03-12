import express from 'express';
import {extractLoginData, loginMap} from "./lib";
const expressValidator = require('express-validator');
const {check, validationResult} = require('express-validator/check');
const validRoles = ['student', 'faculty', 'admin'];

const auth = express.Router();
auth.use(expressValidator());

auth.get('/', (req, res) => {
  res.json({message: 'Root Authentication Endpoint'})
});

auth.post('/login', check('username').exists(),
                    check('pwd').exists(),
                    check('type').exists().isIn(validRoles),
                    async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(401).json({message: 'There was a problem parsing body parameters',
                          errors: errors.array()});
    return 0;
  }

  const loginData = extractLoginData(req.body);
  const loginFunction = loginMap[loginData.type];
  const resp = await loginFunction(loginData.username, loginData.password);
  res.status(resp.status).json(resp);
});

export {auth};