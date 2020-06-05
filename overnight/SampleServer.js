"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = __importStar(require("body-parser"));
var core_1 = require("@overnightjs/core");
var logger_1 = require("@overnightjs/logger");
var UserController_1 = require("./controller/UserController");
//import { SignupController } from './SignupController';
//import * as cors from 'cors'; 
var cors = require("cors");
var SampleServer = /** @class */ (function (_super) {
    __extends(SampleServer, _super);
    function SampleServer() {
        var _this = _super.call(this, process.env.NODE_ENV === 'development') || this;
        _this.app.use(bodyParser.json());
        _this.app.use(bodyParser.urlencoded({ extended: true }));
        var whitelist = ["http://localhost", "http://localhost:8080"];
        var options = {
            origin: whitelist,
            credentials: true,
            allowedHeaders: 'Authorization, Origin, X-Requested-With, Conten-Type, Accept',
            methods: 'POST, GET, DELETE, PUT, OPTIONS',
            maxAge: 3600
        };
        _this.app.use(cors(options));
        _this.setupControllers();
        return _this;
    }
    SampleServer.prototype.setupControllers = function () {
        var userController = new UserController_1.UserController();
        /*const signupController = new SignupController();
        const dbConnObj = new SomeDbConnClass('credentials');
        signupController.setDbConn(dbConnObj);
        userController.setDbConn(dbConnObj);*/
        // super.addControllers() must be called, and can be passed a single controller or an array of 
        // controllers. Optional router object can also be passed as second argument.
        _super.prototype.addControllers.call(this, [userController]
        /*, optional router here*/
        /* middleware that will apply to all controllers here */
        );
    };
    SampleServer.prototype.start = function (port) {
        this.app.listen(port, function () {
            logger_1.Logger.Imp('Server listening on port: ' + port);
        });
    };
    return SampleServer;
}(core_1.Server));
exports.SampleServer = SampleServer;
