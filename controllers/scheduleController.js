const User = require('../models/User')
const Schedule = require('../models/Schedule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// MiddleWares
const scheduleController = {
    // Responsável por buscar consultas em aberto
    opened: async (req, res) => {
        const schedules = await Schedule.find({status: 'opened' }).exec();
        res.send(schedules);
    },
    finish: async (req, res) => {
        const schedules = await Schedule.find({status: 'finish' }).exec();
        res.send(schedules);
    },
    canceled: async (req, res) => {
        const schedules = await Schedule.find({status: 'canceled' }).exec();
        res.send(schedules);
    },
    scheduled: async (req, res) => {
        const schedules = await Schedule.find({status: 'scheduled' }).exec();
        res.send(schedules);
    },
    
    finishUser: async (req, res) => {
        const {user} = req
        const schedules = await Schedule.find({status: 'finish', userId: user._id }).exec();
        res.send(schedules);
    },
    canceledUser: async (req, res) => {
        const {user} = req
        const schedules = await Schedule.find({status: 'canceled', userId: user._id  }).exec();
        res.send(schedules);
    },
    scheduledUser: async (req, res) => {
        const {user} = req
        const schedules = await Schedule.find({status: 'scheduled', userId: user._id  }).exec();
        res.send(schedules);
    },

    toSchedule: async (req, res) => {
        const update = { status: 'scheduled', userId: req.user._id};
        let doc = await Schedule.findById(req.params.id);
        if (doc.status != 'opened'){
            return res.status(400).send("Status incorreto");
        }
        res.send(doc);
    },

    // Responsável por fazer um agendamento
    schedule: async (req, res) => {
        if (!["specialist","exam"].includes(req.body.type)){ 
            return res.status(400).send("Status incorreto");         
        }
        const schedule = new Schedule({
            userId: null,
            appointmentHour: req.body.appointmentHour,
            appointmentDate: req.body.appointmentDate,
            status:  "opened",
            description:  req.body.description,
            title:  req.body.title,
            price:  req.body.price,
            type:  req.body.type,
        })
        try {
            const savedSchedule = await schedule.save();
            res.send(savedSchedule);
        } catch (error) {
            res.status(400).send(error);
        }
    },
}

module.exports = scheduleController;