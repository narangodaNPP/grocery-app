const mongoose = require('mongoose')


const checkoutSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    contact:{
        type: Object,
        required: true
    },
    paymentID:{
        type: String,
        required: true
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