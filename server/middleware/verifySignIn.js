const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const db = require("../models");
const {refreshToken: RefreshToken} = db;

sendSignIn = async (user_acount) => {
    let response;

    const token = jwt.sign({id: user_acount.id}, config.secret, {
        expiresIn: config.jwtExpiration
    });
    let accessExpired = new Date();
    let refreshExpired = new Date();
    accessExpired.setSeconds(accessExpired.getSeconds() + config.jwtExpiration);
    refreshExpired.setSeconds(refreshExpired.getSeconds() + config.jwtRefreshExpiration);

    let refreshToken = await RefreshToken.createToken(user_acount);
    let nickName = user_acount.nickname;
    if(!nickName) nickName ='';
    const content = {
        id: user_acount.id,
        email: user_acount.email,
        nickname: nickName,
        accessToken: token,
        refreshToken: refreshToken,
        accessExpiredTime: accessExpired,
        refreshExpiredTime: refreshExpired,
    };
    response = {result: 'ok', content: content, message: 'User login successfully.'};

    return response;
};

const verifySignIn = {
    sendSignIn: sendSignIn
};

module.exports = verifySignIn;
