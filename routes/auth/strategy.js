import {ExtractJwt, Strategy} from 'passport-jwt';

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('auth_token'),
  secretOrKey: process.env.TOKEN_SECRET
};


/**
 * Create strategy for Authentication tokens
 */
export const authStrategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  if (jwt_payload._id)
    return next(null, jwt_payload._id);
  else
    return next(null, false);
});
