import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import "../config/passport"
const passport = require('passport');
import * as jwt from 'jsonwebtoken';

 
@Controller('auth')
export class UserController {
     @Post('login')
    private getUsers(req: Request, res: Response) {
        passport.authenticate('local', {session: false}, (err:any,user:any, info:any)=>{

            console.log(err,user,info);

            if(err || !user){
                return res.status(401).json({
                    message: 'Login failed',
                    user: user
                });
            }
            req.login(user, {session: false}, (err)=>{
                //Construir el jwt

                const token = jwt.sign(user, 'thisisthejwtsecretABCZD', {
                    expiresIn: '7d',
                    subject: user.iduser + "" //Cast to string
                });

                return res.json(token)
            })
        })(req,res)
    }
}