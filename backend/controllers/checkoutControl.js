const Chekouts = require('../models/checkoutModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


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
            const user = await Users.findById(req.user._id).select('name email')
            if(!user) return res.status(400).json({msg: "User doesn't exist"})

            const {cart, paymentID, contact, houseNo, street, city} = req.body;

            const {_id, first_name, last_name} = user;

            const newCheckout = new Payments({user_id: _id, first_name, last_name, contact, cart, paymentID, houseNo, street, city})

            cart.filter(item => {
                return sold(item._id, item.quantity)
            })

            
            await newCheckout.save()
            res.json({msg: "Order Placed Successfully!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

// const sold = async (id, quantity, oldSold) =>{
//     await Products.findOneAndUpdate({_id: id}, {
//         sold: quantity + oldSold
//     })
// }

module.exports = checkoutControl
