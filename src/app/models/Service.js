const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const uniqueValidator = require('mongoose-unique-validator');

var ServiceSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: [true, 'Service serviceName is required'],
            unique: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
            min: 0,
        },
        serviceTime: {
            type: String,
            required: [true, 'Service serviceTime is required'],
            validate: {
                validator: function (v) {
                    return /\d{2}:\d{2}:\d{2}/.test(v);
                },
                message: (props) => `${props.value} is not a valid time format!`,
            },
        },
    },
    {
        timestamps: true,
    },
);

//Add plugins
ServiceSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
ServiceSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

//Export the model
module.exports = mongoose.model('Service', ServiceSchema);
