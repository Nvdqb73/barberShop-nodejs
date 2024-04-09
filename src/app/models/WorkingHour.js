const mongoose = require('mongoose');

var workingHourSchema = new mongoose.Schema(
    {
        startTime: {
            type: String,
            required: true,
            unique: true,
            validate: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
        },
        endTime: {
            type: String,
            required: true,
            unique: true,
            validate: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('WorkingHour', workingHourSchema);
