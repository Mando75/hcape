/**
 * @author Bryan Muller
 * This file contains middleware functions for
 * parsing authentication tokens
 */
import jwt_decode from 'jwt-decode';

/**
 * Express middleware function.
 * Decodes the jwt auth_token provided in the request header
 * and attaches it to the req object with the "authpayload" key
 * @param req
 * @param res
 * @param next
 */
export const decode_auth = (req, res, next) => {
  if (req.headers.auth_token) {
    try {
      req.authpayload = jwt_decode(req.headers.auth_token);
      next();
    } catch (e) {
      res.status(401).json({message: "Error when decoding Auth token", error: e}).end();
    }
  } else {
    next()
  }
};

