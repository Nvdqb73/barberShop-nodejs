const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        uId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Customer uId is required'],
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

//Add plugins
customerSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

//Export the model
module.exports = mongoose.model('Customer', customerSchema);
