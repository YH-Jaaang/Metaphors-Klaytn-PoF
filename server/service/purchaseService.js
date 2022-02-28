const db = require("../models");
const {transaction} = require("../middleware");
const {user: User} = db;

/*** 쿠키 충전 요청 Service ***/
exports.chargeCookie = async (userId, amountCookie) => {
    let response;
    await User.increment({cookie: amountCookie}, {where: {id: userId}})
        .then(() => {
            return User.findOne({
                attributes: ['email', 'nickname', 'cookie', 'address'],
                where: {
                    id: userId
                }
            })
        })
        .then(async (user) => {
            if(!user.nickname) user.nickname ='';
            const getBalance = await transaction.getBalance(user.address);
            const content = {
                email: user.email,
                nickname: user.nickname,
                cookie: user.cookie,
                token: getBalance
            };
             response = {result: 'ok', content: content};
        })
        .catch(err => {
            throw Error(err.message);
        });

    return response;
};

/*** 토큰 구매 요청 Service ***/
exports.chargeToken = async (userId, token) => {
    let response;
    let userArr;

    await User.findOne({
        attributes: ['email', 'nickname', 'cookie', 'address'],
        where: {
            id: userId
        }
    }).then((user)=>{
        userArr = user;
        if(!user.nickname) userArr.nickname ='';
        return transaction.sendValueTransfer(user.address, token);
    }).then(async () => {
        const getBalance = await transaction.getBalance(userArr.address);
        const content = {
            email: userArr.email,
            nickname: userArr.nickname,
            cookie: userArr.cookie,
            token: getBalance
        };
         response = {result: 'ok', content: content};
    }).catch(err => {
            throw Error(err.message);
        });

    return response;
};