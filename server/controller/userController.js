const userService= require("../service/userService");
const {authJwt} = require("../middleware");

/*** file 처리  ***/
exports.fileUpload=  async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        let uploadFile = req.files.files;

        const response = await userService.fileUpload(userId, uploadFile);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** 사용자 정보 요청 ***/
exports.userInfo = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));

        const response = await userService.userInfo(userId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}
/*** 장르 목록 요청 ***/
exports.genre = async (req, res) => {
    try {
        const response = await userService.genre();
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}
/*** 성격 목록 요청 ***/
exports.personality = async (req, res) => {
    try {
        const response = await userService.personality();
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}