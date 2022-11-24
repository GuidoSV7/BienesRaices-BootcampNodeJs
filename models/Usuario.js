import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import db from '../config/db.js'

const Usuario = db.define('usuarios',{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },

    email:{
        type: Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    },

    token: Sequelize.STRING,
    confirmado: Sequelize.BOOLEAN


},{
    hooks:{
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
    }
})

//Metodos Personalizados
Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

export default Usuario
