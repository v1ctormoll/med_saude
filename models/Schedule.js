const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    userId: {type: String},
    appointmentHour: {type: String, required: true},
    appointmentDate: {type: Date, required: true},
    status: {type: String},
    description: {type: String},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: String}
}) 

module.exports = mongoose.model('Schedule', scheduleSchema)