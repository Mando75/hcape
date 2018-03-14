import express from 'express';
import {extractAccountData, extractLoginData, loginMap} from "./lib";

const {check, validationResult} = require('express-validator/check');


const auth = express.Router();

auth.get('/', (req, res) => {
  res.json({message: 'Root Authentication Endpoint'})
});


const validRoles = ['student', 'faculty', 'admin'];
/**
 * Login endpoint.
 * Verifies that the user has submitted a username, pwd, and type.
 */
auth.post('/login',
    check('username').exists(),
    check('pwd').exists(),
    check('type').exists().isIn(validRoles),
    async (req, res) => {
      // checks for errors from express-validator
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(401).json({
          message: 'There was a problem parsing body parameters',
          errors: errors.array()
        });
        return 0;
      }

      const loginData = extractLoginData(req.body);
      /* loginFunction is created by passing the type to the
       loginMap. This object will return the appropriate login
       function based on the login type. */
      const loginFunction = loginMap[loginData.type];

      /* The resp object will contain a message, status, and token.
         If the login fails, the resp will only contain a message and status */
      const resp = await loginFunction(loginData.username, loginData.password);
      res.status(resp.status).json(resp);
    });

auth.post('/create',
    check('username').exists(),
    check('pwd').exists().isLength({min: 8}).custom(pwd => {
      return (
        pwd.match(/[0-9]+/).length +
        pwd.match(/[A-Z]+/).length +
        pwd.match(/[a-z]+/).length +
        pwd.match(/[!@#$%&/=?_.,:;-\\]+/).length > 2
      )
    }).withMessage('Passwords must be a minimum of 8 characters and contain 3 of the following types of characters: lower-case letters, numbers, upper-case letters, symbols or special characters'),
    check('confirmPwd').exists(),
    check('email').exists().isEmail().trim().normalizeEmail().matches(/@byui.edu/).withMessage('Must use BYU-Idaho email'),
    check('inumber').exists().isLength({min: 9, max: 9}).withMessage('must be 9 digits'),
    async (req, res) => {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(401).json({
          message: 'There was a problem with the body parameters',
          errors: errors.array()
        });
        return 0;
      }

      const accountData = extractAccountData(req.body);
      console.log(accountData);
      res.json(accountData)
    });

export {auth};