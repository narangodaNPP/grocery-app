const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(400).json({msg: "No Authentication Token"});

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication"});

            req.user = user;
            next();
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = auth