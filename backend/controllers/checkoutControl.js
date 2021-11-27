const Checkouts = require('../models/checkoutModel');
const Users = require('../models/userModel')

const checkoutControl = {
    
    // get saved checkouts in db
    getCheckout: async(req, res) =>{
        try {
            const checkouts = await Checkouts.find()
            res.json(checkouts)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // creating checkout and save in db
    createCheckout: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('first_name last_name')
            if(!user) return res.status(400).json({msg: "User doesn't exist'"})

            const {first_name, last_name, cart, contact, houseNo, street, city} = req.body;

            const {_id} = user;

            const newCheckout = new Checkouts({ user_id: _id, first_name, last_name, cart, contact, houseNo, street, city})

            await newCheckout.save()
            res.json({msg: "Order Placed Successfully!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = checkoutControl
