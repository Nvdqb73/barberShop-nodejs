const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseDelete = require('mongoose-delete');

var bookingSchema = new mongoose.Schema(
    {
        startDate: {
            type: Date,
            required: [true, 'Booking startTime is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'Booking endTime is required'],
        },
        description: {
            type: String,
        },
        customerId: {
            type: mongoose.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Booking customerId is required'],
        },
        branchId: {
            type: mongoose.Types.ObjectId,
            ref: 'Branch',
            required: [true, 'Booking branchId is required'],
        },
        employeeId: {
            type: mongoose.Types.ObjectId,
            ref: 'Employee',
            required: [true, 'Booking employeeId is required'],
        },
    },
    {
        timestamps: true,
    },
);

//Add plugins
bookingSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
bookingSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

//Export the model
module.exports = mongoose.model('Booking', bookingSchema);
