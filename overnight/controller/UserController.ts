import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';

 
@Controller('api/users')
export class UserController {
 
    @Get('')
    private get(req: Request, res: Response) {
        return res.status(OK).json({
            message: 'get_called',
        });
    }
 
    @Get('holi/:user/:pass')
    private getxd(req: Request, res: Response) {
        
        return res.status(OK).json({
            message: 'get_called x'+req.params.user+'--'+req.params.pass,
            
        });
    }

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

 /*   @Get('')
    @Middleware([middleware1, middleware2])
    private getAll(req: ISecureRequest, res: Response) {
        return res.status(OK).json({
            message: 'get_all_called',
        });
    }
 
    @Post()
    private add(req: Request, res: Response) {
        return res.status(OK).json({
            message: 'add_called',
        });
    }
 
    @Put('update-user')
    private update(req: Request, res: Response) {
        return res.status(OK).json({
            message: 'update_called',
        });
    }
 
    @Delete('delete/:id')
    private delete(req: Request, res: Response) {
        return res.status(OK).json({
            message: 'delete_called',
        });
    }
 
    @Get(/ane/) // Rexes supported. Matches /lane, /cane, etc.
    public getAne(req: Request, res: Response): any {
        return res.status(OK).json({
            message: '/ane/',
        });
    }
 
    @Get('practice/async')
    private async getWithAsync(req: Request, res: Response) {
        try {
            const asyncMsg = await this.asyncMethod(req);
            return res.status(OK).json({
                message: asyncMsg,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
 
    private asyncMethod(req: Request): Promise<string> {
        return new Promise((resolve) => {
            resolve(req.originalUrl + ' called');
        });
    }*/
}