const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {

    jwt.sign(
        {
            user
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
        (err, token) => {
            if (err) {
                return res.status(500).json(err);
            }
            console.log("THE TOKEN IS",  token)
            res.status(statusCode).json(token);
        }
    );
}

module.exports = sendToken;