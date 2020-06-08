import usuario from '../model/usuarios.mjs'
import conexion from './conexion.mjs'

export class usuarioDao {
    async findAll (callback) {

        const c = new conexion()
        c.conectar()

        const q = await c.conexion.query('select * from user','',async function(error, rows, fields){
            let users = await rows.map((row) => {
                return new usuario(row.nombre,row.apellidos)
            })
            callback(users)
        })
    }
}