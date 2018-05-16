import express from 'express';
import * as auth from "./helpers";
import {createAccount} from "../../../resolvers/auth/create-account";
import {login} from "../../../resolvers/auth/login";

const {check, validationResult} = require('express-validator/check');
const validRoles = ['student', 'faculty'];

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'Root Authentication Endpoint'})
});



/**
 * Login endpoint.
 * Verifies that the user has submitted a username, pwd, and type.
 */
router.post('/login',
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

      // extract the data we need to authenticate
      const loginData = auth.extractLoginData(req.body);


      /* The resp object will contain a message, status, and token.
         If the login fails, the resp will only contain a message and status */
      const resp = await login(loginData.username, loginData.password, loginData.type);
      res.status(resp.status).json(resp);
    });

/**
 * Used for creating new accounts
 * Requires username, pwd, email, inumber, and type.
 */
router.post('/create',
    check('username').exists(),
    check('pwd').exists().isLength({min: 8}).custom(pwd => {
      return (
        pwd.match(/[0-9]+/).length +
        pwd.match(/[A-z]+/).length +
        pwd.match(/[!@#$%&=?_.,:;-\\]+/).length > 2
      )
    }).withMessage('Passwords must be a minimum of 8 characters and contain 3 of the following types of characters: lower-case letters, numbers, upper-case letters, symbols or special characters'),
    check('email').exists().isEmail().trim().normalizeEmail().matches(/@byui.edu/).withMessage('Must use BYU-Idaho email'),
    check('inumber').exists().isLength({min: 9, max: 9}).withMessage('must be 9 digits'),
    check('type').exists().isIn(validRoles),
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

      // Extract data needed to create account
      const accountData = auth.extractAccountData(req.body);
      const opp = await createAccount(accountData);
      res.status(opp.status).json(opp);
    });

export {router};