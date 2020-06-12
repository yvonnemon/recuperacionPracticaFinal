"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../config/database");
function findUser(user, pass) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM user where email = ? and password = ?";
        var usuario = user;
        var password = pass;
        database_1.conn.query(sql, [usuario, password], function (err, result, fields) {
            if (err)
                throw reject(err); //aqui abajo se resuelve la promesa
            console.log(result); //este queremos. es un array -> result[0].username
            //console.log(fields);
            console.log("find all");
            resolve(result);
            console.log(result[0].email);
        });
    });
}
exports.findUser = findUser;
