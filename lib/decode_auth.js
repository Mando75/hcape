import jwt_decode from 'jwt-decode';

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