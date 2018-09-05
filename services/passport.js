const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// serialize user with Passport to create an identifier
// use from google strategy gets passed into the serializing after creation or returning
passport.serializeUser((user, done) => {
  done(null, user.id)
})
// takes in the id that has been stuffed in the cookie and turn it back into an user model out of it
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.client_id,
      clientSecret: keys.google.client_secret,
      callbackURL: '/auth/google/callback'
    },
    (accesToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile id
          done(null, existingUser)
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user))
        }
      })
    }
  )
)
