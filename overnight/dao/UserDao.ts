import { conn } from "../config/database";

export function findUser(user:String, pass:String) {
    return new Promise((resolve,reject) => {
            let sql = "SELECT * FROM user where email = ? and password = ?";
            let usuario = user;
            let password = pass;
            conn.query(sql,[usuario,password], function (err, result, fields) {
              if (err) throw reject(err);//aqui abajo se resuelve la promesa
              console.log(result);//este queremos. es un array -> result[0].username
              //console.log(fields);
              console.log("find all");
              resolve(result)
              console.log(result[0].email);
              
            });
        
    
    })
}