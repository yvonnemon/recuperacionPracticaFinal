import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import "../config/passport"
const passport = require('passport');
import * as jwt from 'jsonwebtoken';

 
@Controller('auth')
export class UserController {
 
    @Get('token/:name/:apellido')
    private getJwt(req: Request, res: Response){
        /*const tokensito = JwtManager.jwt({
            nombre: req.params.x
        });*/
        var jwt = require('jsonwebtoken');
        var tokensito = jwt.sign({
            nombre: req.params.name,
            apellido: req.params.apellido
        },'Secretin secretado, este Secreto esta Encriptado',{algorithm: 'HS256'});
        return res.status(OK).json({
            jwt: tokensito,
        });
    }
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

                var jwt = require('jsonwebtoken');
                var tokensito = jwt.sign({
                    nombre: req.params.name,
                    apellido: req.params.apellido
                },'Secretin secretado, este Secreto esta Encriptado',{algorithm: 'HS256'});
                return res.status(OK).json({
                    jwt: tokensito,
                });
        
            })
        })(req,res)
    }
}