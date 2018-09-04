const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.client_id,
      clientSecret: keys.google.client_secret,
      callbackURL: '/auth/google/callback'
    },
    (accesToken, refreshToken, profile, done) => {
      console.log(
        'accessToken:',
        accesToken,
        'refreshToken:',
        refreshToken,
        'profile:',
        profile,
        'done:',
        done
      )
    }
  )
)
