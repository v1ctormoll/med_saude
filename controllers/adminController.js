const User = require('../models/User')
const Schedule = require('../models/Schedule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// MiddleWares que podem ser acessados apenas pelo administrador
adminController = {
    // Responsável por fazer o login
    login: async (req, res) => {
        console.log("Você está tentando fazer login como administrador");
        // Verificando Email
        const selectedUser = await User.findOne({
            email: req.body.email
        })
        if (!selectedUser){
            console.log('Email ou senha incorretos');
            return res.status(400).send('Email ou senha incorretos')
        }

        // Verificando Senha
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if (!passwordAndUserMatch){
            console.log('Email ou senha incorretos');
            return res.status(400).send('Email ou senha incorretos')
        }

        // Verificando se é administrador
        console.log("Status do admin:");
        console.log(selectedUser.admin);
        if (selectedUser.admin) {
            //criando token
            const token = jwt.sign({ _id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
            const response = {
                authorizationToken: token
            }
            console.log("Token:", response);
            res.send(response);
        }
        else {
            console.log("Você não é um administrador");
            res.status(401).send("+istrador");
        }
    },
}
module.exports = adminController;

// ryanne 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlmZGExMjc3YmRlMDJhZmM0YzEwYTgiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTA4ODgxNH0.bwlMqZ_i3jHmoTfkPwzgVSjv0ASwckNyh3gCZaCTYjQ

// Lucas

// 	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlmZGNmOGM2NGJlODJiYzg0ZDM2ZTUiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTA4OTU0Mn0.T6Ma6DxU4Io2UaBBxplJ3RtJA285NGRvoPSnjVIf8to