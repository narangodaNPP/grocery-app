const Checkouts = require('../models/checkoutModel')

const checkoutControl = {
    getCheckout: async(req, res) =>{
        try {
            const checkouts = await Checkouts.find()
            res.json(checkouts)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCheckout: async(req, res) => {
        try {
            const {cart, first_name, last_name, contact, houseNo, street, city} = req.body;

            const newCheckout = new Checkouts({first_name, last_name, contact, cart, houseNo, street, city})
            
            await newCheckout.save()
            res.json({msg: "Order Placed Successfully!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = checkoutControl
