const User = require('../models/User')
const Schedule = require('../models/Schedule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifySchedule = require('../verify/verifySchedule')

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

    // Responsável por visualizar todos os agendamentos realizados de um cliente
    viewSchedule: async (req, res) => {
        console.log("Você está tentando ver todas as tarefas como um administrador");
        // Verificando se tratar de um administrador
        if (req.user.admin) {
            console.log("Você está tentando ver as tarefas como um admin");
            try {
                let selectedSchedule = await Schedule.find();
                console.log("Tarefas apresentadas");
                res.send(selectedSchedule);
            } catch (error) {
                res.send(error)
            }
        } else {
            console.log("Você não é um administrador");
            res.status(401).send("Você não é administrador");
        }
    },

    // Responsável por concluir uma tarefa de um cliente.
    completeSchedule: async (req, res) => {
        console.log("Você está tentando concluir uma tarefa de um cliente como administrador");
        // Verificando se tratar de um administrador
        if (req.user.admin) {
            let id = req.params.id;
            if (!id) {id = req.body.id;}

            const a = new Date;
            let timeNow = {
                day: a.getDate(),
                hour: a.getHours(),
                minute: a.getMinutes()
            }

            const verify = await Schedule.findOne({ _id: id })
            if (verify == null) {
                console.log("Tarefa inexistente")
                res.status(404).send("Essa tarefa não existe");
            }else {
                // Verificando se a tarefa a ser concluida já se iniciou
                if (timeNow.day > verify.startDay) { // Solicitado dias após a tarefa ser iniciada
                    await Schedule.remove(verify)
                    console.log("Id da tarefa completa", id);
                    res.send(id);
                }else {
                    if(timeNow.day == verify.startDay){ // Solicitado no mesmo dia
                        // Verifica qual tarefa é anterior a outra, colocando a hora em minutos e somando com os minutos
                        let tempNow = timeNow.hour*60 +  timeNow.minute;
                        let tempSchedule = verify.startHour*60 + verify.startMinute;
                        if(tempSchedule <= tempNow){
                            await Schedule.remove(verify)
                            console.log("Id da tarefa completa", id);
                            res.send(id);
                        }else{
                            console.log("Tarefa não pode ser completada, pois ela ainda não se iniciou");
                            res.status(406).send("Tarefa não pode ser completada, pois ela ainda não se iniciou");
                        }
                    }else{ // Solicitado em dias anteriores
                        console.log("Tarefa não pode ser completada, pois ela ainda não se iniciou");
                        res.status(406).send("Tarefa não pode ser completada, pois ela ainda não se iniciou");
                    }
                }
            }
        }else {
            console.log("Você não é um administrador");
            res.status(401).send("Você não é administrador");
        }

    },

    //responsável por cancelar um agendamento
    cancelSchedule: async (req, res) => {
        console.log("Você está tentando cancelar uma tarefa como administrador");
        // Verificando se tratar de um administrador
        if (req.user.admin) {
            let id = req.params.id;
            if (!id) {
                id = req.body.id;
            }
            const verify = await Schedule.findOne({ _id: id })
            if (verify == null) {
                console.log("Tarefa inexistente");
                res.status(404).send("Essa tarefa não existe");
            }else {
                // Verificando se a tarefa a ser cancelada tem menos de 6 horas
                if (verifySchedule.Cancel(verify)) {
                    await Schedule.remove(verify)
                    console.log("Id da tarefa cancelada", id);
                    res.send(id);
                }else {
                    console.log("Não foi possível cancelar esse agendamento, falta menos de 6 horas, ou a tarefa já foi iniciada");
                    res.status(406).send("Não foi possível cancelar esse agendamento, falta menos de 6 horas, ou a tarefa já foi iniciada");
                }
            }
        }else {
            console.log("Você não é administrador");
            res.status(401).send("Você não é administrador");
        }
    }
}
module.exports = adminController;

// ryanne 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlmZGExMjc3YmRlMDJhZmM0YzEwYTgiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTA4ODgxNH0.bwlMqZ_i3jHmoTfkPwzgVSjv0ASwckNyh3gCZaCTYjQ

// Lucas

// 	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlmZGNmOGM2NGJlODJiYzg0ZDM2ZTUiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTA4OTU0Mn0.T6Ma6DxU4Io2UaBBxplJ3RtJA285NGRvoPSnjVIf8to