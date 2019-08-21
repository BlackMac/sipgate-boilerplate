const passport = require('passport');
const refresh = require('passport-oauth2-refresh');

const { OAuth2Strategy } = require('passport-oauth');
const moment = require('moment');
const sipgate = require('../lib/sipgate')();
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const sipgateStrategy = new OAuth2Strategy({
  authorizationURL: process.env.SIPGATE_AUTH_URL,
  tokenURL: process.env.SIPGATE_TOKEN_URL,
  clientID: process.env.SIPGATE_CLIENT_ID,
  clientSecret: process.env.SIPGATE_CLIENT_SECRET,
  callbackURL: '/auth/sipgate/callback'
},
(req, refreshToken, tokenDetails, params, done) => {
  const tokenData = {
    kind: 'sipgate',
    accessToken: tokenDetails.access_token,
    refreshToken,
    accessTokenExpiresIn: tokenDetails.expires_in,
    refreshTokenExpiresIn: tokenDetails.refresh_expires_in,
    accessTokenExpires: +moment().add(tokenDetails.expires_in, 'seconds'),
    refreshTokenExpires: +moment().add(tokenDetails.refresh_expires_in, 'seconds')
  };

  sipgate.auth.getUserInfo(tokenData).then((profile) => {
    if (req.user) {
      User.findOne({ 'sipgate.userId': profile.userId }, (err, existingUser) => {
        if (err) {
          req.flash('errors', { msg: 'An Error occured' });
          return done(err);
        }
        if (existingUser) {
          req.flash('errors', { msg: 'There is already an sipgate account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
          done(err);
        } else {
          User.findById(req.user.id, (err, user) => {
            if (err) { return done(err); }
            user.sipgate = profile;
            user.tokens.push(tokenData);
            console.log(user.tokens);
            user.save((err) => {
              req.flash('info', { msg: 'sipgate account has been linked.' });
              done(err, user);
            });
          });
        }
      });
    } else {
      User.findOne({ 'sipgate.userId': profile.userId }, (err, existingUser) => {
        if (err) { return done(err); }
        if (existingUser) {
          const user = new User(existingUser);
          user.tokens = [];
          user.tokens.push(tokenData);
          user.save();
          return done(null, user);
        }
        const user = new User();
        user.sipgate = profile;
        user.tokens.push(tokenData);
        sipgate.user.getInfo(tokenData, profile.sub).then((userInfo) => {
          user.profile.name = `${userInfo.firstname} ${userInfo.lastname}`;
          user.email = `${userInfo.email}`;
          user.save((err) => {
            done(err, user);
          });
        });
      });
    }
  });
});

passport.use('sipgate', sipgateStrategy);
refresh.use('sipgate', sipgateStrategy);

exports.refreshSipgateToken = (req, res, next) => {
  if (req.user && req.user.tokens) {
    const tokens = req.user.tokens[0];
    if (tokens.accessTokenExpires - new Date().getTime() < 50000) {
      console.log('Fetching new Tokens');
      refresh.requestNewAccessToken('sipgate', tokens.refreshToken, (err, newAccessToken, newRefreshToken) => {
        const newTokens = tokens;
        newTokens.accessToken = newAccessToken;
        newTokens.refreshToken = newRefreshToken;
        newTokens.accessTokenExpires = +moment().add(tokens.accessTokenExpiresIn, 'seconds');
        newTokens.refreshTokenExpires = +moment().add(tokens.refreshTokenExpiresIn, 'seconds');
        req.user.tokens = newTokens;
        const user = new User(req.user);
        user.tokens.push(newTokens);
        user.save().then(() => { next(); });
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/')[2];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
