import passport from "passport";
import passportJWT from "passport-jwt"
const strategyJWT = passportJWT.Strategy
import { ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";

const passportMiddleware = {
    verify: (req, res, next) => {
        passport.use(new strategyJWT({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
            secretOrKey: process.env.JWT_ACCESSTOKEN_KEY,
        }, async (jwt_payload, done)=>{
            
              req.user = jwt_payload;
              next();
        })) 
    },
}
passport.use(new strategyJWT({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_ACCESSTOKEN_KEY,
}, async (jwt_payload, done)=>{
    try {
        const user = await User.findById(jwt_payload.id)
        if (!user) return done(null, false);
        done(null, user)
    } catch (error) {
       done(error, false); 
    }
}))
