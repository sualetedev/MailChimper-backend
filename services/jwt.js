//Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta usada para generar el token
const secret = "CLAVE_SECRETA_del_proyecto_DEL_MAILCHIMPER1212";

//Crear una funcion para generar tokens
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,        
        email: user.email,       
        iat: moment().unix(),
        exp: moment().add(30,"days").unix(),
    }
    //Devolver un jwt token codificado
    return jwt.encode(payload, secret);
}


module.exports = {
    secret,
    createToken,
} 
