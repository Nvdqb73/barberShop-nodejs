const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var branchSchema = new mongoose.Schema(
    {
        branchName: {
            type: String,
            required: [true, 'Branch name is required'],
            unique: true,
            trim: true,
        },
        branchAddress: {
            type: String,
            required: [true, 'Branch address is required'],
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'Branch phone is required'],
            unique: true,
            trim: true,
        },
        workingHoursId: {
            type: mongoose.Types.ObjectId,
            ref: 'WorkingHour',
            required: [true, 'Branch workingHoursId is required'],
        },
    },
    {
        timestamps: true,
    },
);
//Add plugins
branchSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

//Export the model
module.exports = mongoose.model('Branch', branchSchema);
