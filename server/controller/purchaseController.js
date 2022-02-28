const purchaseService= require("../service/purchaseService");
const jwt = require("jsonwebtoken");
const {authJwt} = require("../middleware");

/*** 쿠키 충전 요청 ***/
exports.chargeCookie = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const cookie = req.body.cookie;
        if (cookie == undefined || cookie == "")  {
            throw Error("Wrong Parameters");
        }

        const response = await purchaseService.chargeCookie(userId, cookie);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** 토큰 구매 요청 ***/
exports.chargeToken= async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const token = req.body.token;
        if (token == undefined || token == "")  {
            throw Error("Wrong Parameters");
        }
        const response = await purchaseService.chargeToken(userId, token);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }

}