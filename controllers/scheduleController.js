const User = require('../models/User')
const Schedule = require('../models/Schedule')

// MiddleWares
const scheduleController = {
    // Responsável por buscar consultas em aberto
    opened: async (req, res) => {
        const schedules = await Schedule.find({status: 'opened' }).exec();
        res.send(schedules);
    },
    
    finished: async (req, res) => {
      console.log('entra')
      const schedules = await Schedule.find({status: 'finished' }).exec();
      let new_schedules = []
      await Promise.all(schedules.map(async (e) => {
        if(e.userId){
          try{
            const selectedUser = await User.findById(e.userId)
            console.log(selectedUser, 'user')
            let newSchema = {...e._doc}
            newSchema.user = {
              name: selectedUser.name,
              email: selectedUser.email,
              cpf: selectedUser.cpf,
              birthDate: selectedUser.birthDate
            }
            new_schedules.push(newSchema)
            return e
          }
          catch(error){
            res.status(400).send(error);
          }
        }else{
          new_schedules.push(e)
          return e
        }
      }))
      console.log(new_schedules, 'envia')
      res.send(new_schedules);
    },
    
    canceled: async (req, res) => {
      const schedules = await Schedule.find({status: 'canceled' }).exec();
      let new_schedules = []
      await Promise.all(schedules.map(async (e) => {
        if(e.userId){
          try{
            const selectedUser = await User.findById(e.userId)
            console.log(selectedUser, 'user')
            let newSchema = {...e._doc}
            newSchema.user = {
              name: selectedUser.name,
              email: selectedUser.email,
              cpf: selectedUser.cpf,
              birthDate: selectedUser.birthDate
            }
            new_schedules.push(newSchema)
            return e
          }
          catch(error){
            res.status(400).send(error);
          }
        }else{
          new_schedules.push(e)
          return e
        }
      }))
      res.send(new_schedules);
    },
    scheduled: async (req, res) => {
      const schedules = await Schedule.find({status: 'scheduled' }).exec();
      let new_schedules = []
      await Promise.all(schedules.map(async (e) => {
        if(e.userId){
          try{
            const selectedUser = await User.findById(e.userId)
            console.log(selectedUser, 'user')
            let newSchema = {...e._doc}
            newSchema.user = {
              name: selectedUser.name,
              email: selectedUser.email,
              cpf: selectedUser.cpf,
              birthDate: selectedUser.birthDate
            }
            new_schedules.push(newSchema)
            return e
          }
          catch(error){
            res.status(400).send(error);
          }
        }else{
          new_schedules.push(e)
          return e
        }
      }))
      res.send(new_schedules);
    },
    
    finishedUser: async (req, res) => {
        const {user} = req
        const schedules = await Schedule.find({status: 'finished', userId: user._id }).exec();
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
        let doc = {}
        try {
          doc = await Schedule.findById(req.params.id);
        } catch (error) {
          res.status(400).send(error);
        }

        if (doc.status != 'opened'){
          return res.status(400).send({message: "Status incorreto"});
        }

        doc.status = 'scheduled'
        doc.userId = req.user._id
        try {
          await doc.save();
        } catch (error) {
          res.status(400).send(error);
        }
        res.send(doc);
    },

    toCancel: async (req, res) => {
      let doc = {}
      try {
        doc = await Schedule.findById(req.params.id);
      } catch (error) {
        res.status(400).send(error);
      }

      if (doc.status != 'scheduled'){
        return res.status(400).send({message: "Status incorreto"});
      }

      doc.status = 'canceled'
      try {
        await doc.save();
      } catch (error) {
        res.status(400).send(error);
      }
      res.send(doc);
    },

    toFinish: async (req, res) => {
      let doc = {}
      try {
        doc = await Schedule.findById(req.params.id);
      } catch (error) {
        res.status(400).send(error);
      }

      if (doc.status != 'scheduled'){
        return res.status(400).send({message: "Status incorreto"});
      }

      doc.status = 'finished'
      try {
        await doc.save();
      } catch (error) {
        res.status(400).send(error);
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


    delete: async (req, res) => {
      let doc = {}
      let id = req.params.id
      try {
        doc = await Schedule.findById(id);
      } catch (error) {
        res.status(400).send(error);
      }

      if (!['opened', 'finished', 'canceled'].includes(doc.status)){
        return res.status(400).send({message: "Status incorreto"});
      }

      try {
        await Schedule.remove(doc);
        res.send(id)
      } catch (error) {
        res.status(400).send(error);
      }
    },
}

module.exports = scheduleController;