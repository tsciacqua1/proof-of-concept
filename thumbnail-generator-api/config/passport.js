const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({ region: "sa-east-1" });

const db = new AWS.DynamoDB.DocumentClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      const params = {
        TableName: "Users",
        Key: {
          email: jwt_payload.sub,
        },
      };

      await db.get(params, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
