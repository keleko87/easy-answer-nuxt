const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

// Passport Routes Configuration
router.get('/login', ensureLoggedOut(), passport.authenticate('slack'))

// OAuth callback url
router.get('/slack/callback', ensureLoggedOut(),
  passport.authenticate('slack', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/error-login'
  }))

// (req, res, next) => {

//   passport.authenticate('slack', (err, user, info) => {
//     if (err) { return next(err); }

//     if (!user) { return res.redirect('/login'); }

//     req.logIn(user, (err) => {
//       if (err) { return next(err); }
//       console.log('useeesssssssssssssssssssssssssss', user);
//       return res.json(user);
//     });

//   })(req, res, next);
// });

router.get('/error-login', (req, res) => {
  res.status(200).send({ user: 'User no authorized' })
})

router.get('/profile', ensureLoggedIn('/auth/login'), (req, res) => {
  let user
  if (req.user) { user = req.user }
  res.json(user)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).json({ message: 'Logout success' })
})

module.exports = router
