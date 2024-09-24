const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var workingHourSchema = new mongoose.Schema(
    {
        startTime: {
            type: String,
            required: [true, 'WorkingHour startTime is required'],
            unique: true,
            validate: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
        },
        endTime: {
            type: String,
            required: [true, 'WorkingHour endTime is required'],
            unique: true,
            validate: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
        },
    },
    {
        timestamps: true,
    },
);

//Add plugins
workingHourSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
//Export the model
module.exports = mongoose.model('WorkingHour', workingHourSchema);
