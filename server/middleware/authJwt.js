const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;

const {TokenExpiredError} = jwt;

const catchError = (err, res) => {
    //액세스 토큰이 만료되었을 경우,
    if (err instanceof TokenExpiredError) {
        return res.status(200).send({result: 'false', message: "Unauthorized! Access Token was expired!"});
    }
    //토큰이 승인되지 않을 경우,
    return res.sendStatus(200).send({result: 'false', message: "Unauthorized!"});
}

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    //토큰이 존재하지 않을 경우,
    if (token == undefined || token == "") {
        return res.status(200).send({result: 'false', message: "No token provided!"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};


const accessToken = (accessToken) => {
    return jwt.decode(accessToken).id;
};

const authJwt = {
    verifyToken: verifyToken,
    accessToken: accessToken,
};

module.exports = authJwt;
