const mongoose = require('mongoose');

var branchSchema = new mongoose.Schema(
    {
        branchName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        branchAddress: {
            type: String,
            required: true,
            unique: true,
        },
        branchPhone: {
            type: String,
            required: true,
            unique: true,
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
module.exports = mongoose.model('Branch', branchSchema);
