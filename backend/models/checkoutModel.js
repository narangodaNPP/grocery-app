// model for save checkout details in db

const mongoose = require('mongoose')


const checkoutSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: false,
        trim: true,
    },
    last_name:{
        type: String,
        required: false,
        trim: true,
    },
    contact: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    houseNo:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Checkouts", checkoutSchema)