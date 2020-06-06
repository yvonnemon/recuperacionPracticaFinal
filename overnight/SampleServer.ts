import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { UserController } from './controller/UserController';
//import { SignupController } from './SignupController';
//import * as cors from 'cors'; 
import cors = require('cors'); 

 
export class SampleServer extends Server {
    
    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        const whitelist = ["http://localhost","http://localhost:8080"]
        const options:cors.CorsOptions = {
            origin: whitelist,
            credentials: true,
            allowedHeaders: 'Authorization, Origin, X-Requested-With, Conten-Type, Accept',
            methods: 'POST, GET, DELETE, PUT, OPTIONS',
            maxAge: 3600
        }
        this.app.use(cors(options))


        this.setupControllers();
    }
 
    private setupControllers(): void {
        const userController = new UserController();
        /*const signupController = new SignupController();
        const dbConnObj = new SomeDbConnClass('credentials');
        signupController.setDbConn(dbConnObj);
        userController.setDbConn(dbConnObj);*/
        // super.addControllers() must be called, and can be passed a single controller or an array of 
        // controllers. Optional router object can also be passed as second argument.
        super.addControllers(
            [userController]
            /*, optional router here*/
            /* middleware that will apply to all controllers here */
        );
    }
 
    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp('Server listening on port: ' + port);
        })
    }
}