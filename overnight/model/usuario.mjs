export class Usuario{
    constructor (nombre, apellidos){
        this._nombre = nombre
        this._apellidos = apellidos
    }

    get nombre() {
        return this._nombre
    }

    set nombre(value){
        this._nombre = value
    }
    get apellidos() {
        return this._apellidos
    }

    set apellidos(value){
        this._apellidos = value
    }


}