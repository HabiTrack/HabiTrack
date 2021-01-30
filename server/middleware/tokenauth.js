const jwt = require("jsonwebtoken");

//TOKEN FORMAT:
// Authorization: Bearer <Token>
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        
        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                return next();
            }
        });
    } else {
        return res.sendStatus(403);
    }
}

module.exports = {verifyToken};

