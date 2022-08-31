const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
module.exports = app => {
  //initialize
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({email})
      .then(user => {
        //if user does not exists
        if (!user) {
          return done(null, false, { message: 'Your email is not registered.' })
        }
        if (password !== user.password) {
          return done(null, false, { message: 'Your password is not correct.' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
      })
    )
  
    //設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user)) 
      .catch(err => done(err, null))
  })
}