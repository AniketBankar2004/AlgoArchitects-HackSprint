const User = require('./userschema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })

    if (!user) return done(null, false, { message: 'User does not exist' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return done(null, false, { message: 'Incorrect password' })

    return done(null, { id: user.id })
  })
)

passport.serializeUser((user, done) => {
  done(null, { id: user.id })
})

passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findById(data.id)
    if (!user) return done(null, false)

    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

module.exports = passport
