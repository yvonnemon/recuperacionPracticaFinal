const passport = require('passport');
import * as passportLocal from "passport-local"
require("./database")

import { findUser } from '../dao/UserDao'
//import { findAndValidate } from '../dao/UserDao'

const LocalStrategy = passportLocal.Strategy;

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