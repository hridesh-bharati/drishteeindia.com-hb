const jwt = require('jsonwebtoken');
const JWTKEYS = process.env.JWTKEYS;
const { admin } = require('../Model/admin');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must have do Login For post in" });
    }
    const token = authorization;

    jwt.verify(token, JWTKEYS, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must have logged in" });
        }
        else {
            const { _id } = payload;
            admin.findById(_id).then(userdata => {
                req.user = userdata
                next();
            })
        }
    })

}