const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    try {

        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = verify.user;
        next();


    } catch (e) {
        console.error(e);
        res.status(401).json({
            errorMessage: "Unauthorized"
        });
    }
}

module.exports = auth;