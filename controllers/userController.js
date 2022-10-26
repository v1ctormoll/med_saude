const User = require('../models/User')
const Schedule = require('../models/Schedule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifySchedule = require('../verify/verifySchedule')

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
        if (!passwordAndUserMatch) return res.status(400).send('Email ou senha incorretos')

        //criando token
        const token = jwt.sign({ _id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
        const response = {
            authorizationToken: token
        }
        res.send(response);
    },

    // Responsável por visualizar todos os agendamentos realizados de um cliente
    viewSchedule: async (req, res) => {
        try{
            let selectedSchedule = await Schedule.find({userId: req.user._id});
            res.send(selectedSchedule);
        }catch (error) {
            res.send(error)
        }
    },

    // Responsável por cancelar o agendamento de um cliente
    cancelSchedule: async (req, res) => {
        console.log(req.user);
        let id = req.params.id;
        if (!id) {
            id = req.body.id;
        }

        const verify = await Schedule.findOne({ _id: id, userId: req.user._id })
        if (verify == null) {
            res.status(404).send("Você não criou essa tarefa ou ela não existe");
        } else {
            // Verificando se a tarefa a ser cancelada tem menos de 6 horas
            if(verifySchedule.Cancel(verify)){

                await Schedule.remove(verify)
                res.send(id);
            }
            else{
                res.send("Não foi possível deletar seu agendamento, falta menos de 6 horas, ou a tarefa já foi iniciada");
            }
        }
    }
}

module.exports = userController;