import {ExtractJwt, Strategy} from 'passport-jwt';

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET
};

export const authStrategy = new Strategy(jwtOptions, async (jwt_payload, next) => {
  if (jwt_payload._id)
    return next(null, jwt_payload._id);
  else
    return next(null, false);
});
