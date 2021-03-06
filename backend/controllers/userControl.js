const Users = require('../models/userModel');
const Checkouts = require('../models/checkoutModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userControl = {
    register: async(req, res) =>{
        try {
            const {first_name, last_name, email, password} = req.body;

            const user = await Users.findOne({email});
            if(user) 
                return res.status(400).json({msg: "Email already exists"})

            if(password.length < 8)
                return res.status(400).json({msg: "Password must consist at least 8 characters"})
            
            const passwordEncrypt = await bcrypt.hash(password, 10); // encrypt the password
            
            const newUser = new Users({
                first_name, last_name, email, password: passwordEncrypt
            })

            // res.json(newUser);

            await newUser.save(); // save in mongoDB

            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000, //for week
            })

            res.json({accesstoken})
        }   
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    login: async(req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg: "User doesn't exist"});

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect Password"});

            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: 'user/refresh_token',
                maxAge: 7*24*60*60*1000, // one week
            })

            res.json({accesstoken});

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: 'user/refresh_token'});
            res.json({msg: "Successfully Logged Out"});

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) => {
        try{
            const ref_token = req.cookies.refreshtoken;
            if(!ref_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(ref_token, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
                if(err) return res.status(400).json({msg: "Please Login or Register"})
                
                const accesstoken = createAccessToken({id: user.id});

                res.json({accesstoken});
            })
        
        } catch(err){
            return res.status(500).json({msg: err.message}) 
        }
    }, 
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) res.status(400).json({msg: "User doesn't exists"})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }

    }, 
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User doesn't exist"})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Checkouts.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "11m"})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, {expiresIn: "7d"})
}

module.exports = userControl