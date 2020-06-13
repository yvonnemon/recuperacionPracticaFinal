import * as passportLocal from "passport-local"
import * as passportGoogle from 'passport-google-oauth2';

require("./database")

import { findUser } from '../dao/UserDao'
//import { findAndValidate } from '../dao/UserDao'

const passport = require('passport');
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser(function(user:any, done:any) {
  done(null, user);
});

passport.deserializeUser(function(obj:any, done:any) {
  done(null, obj);
});

passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass'
},
    async function(username:any, password:any, done:any) {
      console.log('Entra',username, password);
      console.log("llega al passport");
      let resultado:any = await findUser(username,password);
      console.log(resultado.name+'--'+resultado.password);

    //      console.log("un usuario:");
  //    let x = await findAndValidate(username,password);
  //    console.log(x);
      
      if(username == resultado[0].email && password == resultado[0].password){
        return done(null, {
          username: resultado[0].email,
          iduser: resultado[0].iduser,
          apellido: resultado[0].lastname,
          name: resultado[0].name
        })
      } else {
        return done('error, mal usuario')
      }


    }
  ));
  passport.use(new GoogleStrategy({
    clientID: "942070895288-9peui0amtjopi13m1t6eq6ib266c020o.apps.googleusercontent.com",
    clientSecret: "mpeulc33ujD5ZW1YLM8536nA",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  async function(request: any, accessToken: string, refreshToken: string, profile: any, done: any) {
    console.log(profile);
    
    return done(null,{
      username: profile.email,
      name: profile.given_name,
      apellido: profile.family_name
    });
  }
));