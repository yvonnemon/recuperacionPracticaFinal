"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var core_1 = require("@overnightjs/core");
require("../config/passport");
var passport = require('passport');
var jwt = __importStar(require("jsonwebtoken"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.get = function (req, res) {
        return res.status(http_status_codes_1.OK).json({
            message: 'get_called',
        });
    };
    UserController.prototype.getxd = function (req, res) {
        return res.status(http_status_codes_1.OK).json({
            message: 'get_called x' + req.params.user + '--' + req.params.pass,
        });
    };
    UserController.prototype.getJwt = function (req, res) {
        /*const tokensito = JwtManager.jwt({
            nombre: req.params.x
        });*/
        var jwt = require('jsonwebtoken');
        var tokensito = jwt.sign({
            nombre: req.params.name,
            apellido: req.params.apellido
        }, 'Secretin secretado, este Secreto esta Encriptado', { algorithm: 'HS256' });
        return res.status(http_status_codes_1.OK).json({
            jwt: tokensito,
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        passport.authenticate('local', { session: false }, function (err, user, info) {
            console.log(err, user, info);
            if (err || !user) {
                return res.status(401).json({
                    message: 'Login failed',
                    user: user
                });
            }
            req.login(user, { session: false }, function (err) {
                //Construir el jwt
                var token = jwt.sign(user, 'thisisthejwtsecretABCZD', {
                    expiresIn: '7d',
                    subject: user.iduser + "" //Cast to string
                });
                return res.json(token);
            });
        })(req, res);
    };
    __decorate([
        core_1.Get('')
    ], UserController.prototype, "get", null);
    __decorate([
        core_1.Get('holi/:user/:pass')
    ], UserController.prototype, "getxd", null);
    __decorate([
        core_1.Get('token/:name/:apellido')
    ], UserController.prototype, "getJwt", null);
    __decorate([
        core_1.Post('login')
    ], UserController.prototype, "getUsers", null);
    UserController = __decorate([
        core_1.Controller('auth')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
