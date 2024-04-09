const mongoose = require('mongoose');

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
        },
        branchId: {
            type: mongoose.Types.ObjectId,
            ref: 'Branch',
        },
        workingHoursId: {
            type: mongoose.Types.ObjectId,
            ref: 'WorkingHour',
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Employee', employeeSchema);
