import mysql from 'mysql'

export class conexion{
    constructor (){
        this._conexion = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'practica',
            port: 3306
        })
    }

    get conexion(){
        return this._conexion
    }

    conectar(){
        this._conexion.connect(function(err){
            if(err) throw err;
            console.log("conectado");
            
        })
    }
}