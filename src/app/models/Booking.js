const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseDelete = require('mongoose-delete');

var bookingSchema = new mongoose.Schema(
    {
        appointmentDate: {
            type: Date,
            required: [true, 'Booking appointmentDate is required'],
        },
        startTime: {
            type: String,
            required: [true, 'Booking startTime is required'],
            validate: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
        },
        endTime: {
            type: String,
            required: [true, 'Booking endTime is required'],
            validate: /([01]?[0-9]|2[0-3]):[0-5][0-9]/,
        },
        note: {
            type: String,
        },
        customerId: {
            type: mongoose.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Booking customerId is required'],
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
