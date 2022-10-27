const User = require('../models/User')
const Schedule = require('../models/Schedule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// MiddleWares
userController = {
    // Responsável por fazer o registro
    register: async (req, res) => {
        const selectedUser = await User.findOne({
            email: req.body.email
        })
        if (selectedUser) return res.status(400).send('Email já existe')

        const selectedUserName = await User.findOne({
            email: req.body.name
        })
        if (selectedUserName) return res.status(400).send('Nome já existe')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            birthDate: req.body.birthDate,
            password: bcrypt.hashSync(req.body.password)
        })
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Responsável por fazer o login
    login: async (req, res) => {
        // Verificando Email
        const selectedUser = await User.findOne({
            email: req.body.email
        })
        if (!selectedUser) return res.status(400).send('Email ou senha incorretos')

        // Verificando Senha
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if (!passwordAndUserMatch) return res.status(400).send({message: 'Email ou senha incorretos'})

        //criando token
        const token = jwt.sign({ _id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
        const user = {
          name: selectedUser.name,
          email: selectedUser.email,
          admin: selectedUser.admin,
          cpf: selectedUser.cpf,
          birthDate: selectedUser.birthDate,
          id: selectedUser._id
        }
        const response = {
            user,
            authorizationToken: token
        }
        res.send(response);
    },
}

module.exports = userController;