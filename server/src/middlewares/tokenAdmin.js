const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function tokenAdmin(req, res, next){
    const token = req.headers['x-acess-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err)
           return res.status(401).json({ err: err.message });

        req.userId = decoded.userId;

        next();
    })
}

module.exports = tokenAdmin;