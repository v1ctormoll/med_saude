const express = require('express'); // Utilizar o express 
const router = express.Router(); // Utilizar o router
const userController = require('../controllers/userController') // Importando os controladores
const authUser = require('../controllers/authUserController')

// Conectando o banco de dados
const mongoose = require('mongoose'); // npm install mongoose
mongoose.connect(process.env.MONGO_CONECTION_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true}, (erro)=>{
        if(erro){
            console.log(erro);
        }else{
            console.log("Banco de dados conectado"); 
        }
    });
// Duas rotas criadas, uma de registro outra de login

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;