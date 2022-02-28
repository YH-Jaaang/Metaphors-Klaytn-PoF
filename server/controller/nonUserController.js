const nonUserService= require("../service/nonUserService");
const jwt = require("jsonwebtoken");

/*** 소설 목록 반환 요청 (비회원) ***/
exports.novelList = async (req, res) => {
    try {
        const response = await nonUserService.novelList();
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }

}