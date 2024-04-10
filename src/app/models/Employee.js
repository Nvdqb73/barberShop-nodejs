const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var employeeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        image: {
            type: String,
        },
        workDay: {
            type: Date,
        },
        uId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Employee uId is required'],
            unique: true,
        },
        branchId: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Employee branchId is required'],
            ref: 'Branch',
        },
    },
    {
        timestamps: true,
    },
);

//Add plugins
employeeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

//Export the model
module.exports = mongoose.model('Employee', employeeSchema);
