const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    userId: {type: String},
    appointmentHour: {type: String},
    appointmentDate: {type: Date},
    status: {type: String},
    description: {type: String},
    title: {type: String},
    price: {type: Number},
    type: {type: String}
}) 

module.exports = mongoose.model('Schedule', scheduleSchema)