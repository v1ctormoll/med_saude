// Criando um esquema que depois será guardado no banco de dados

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type:String, required: true, minlength: 3, maxlength: 50},
    email: {type:String, required: true, minlength: 3, maxlength: 100},
    cpf: {type:String, required: false, minlength: 3, maxlength: 100},
    birthDate: {type:String, required: false, minlength: 3, maxlength: 100},
    password: {type:String, required: true, minlength: 6, maxlength: 200},
    admin: {type:Boolean, default: false},
    createdAt: {type:Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema);