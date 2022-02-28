const db = require("../models");
const kakaoConfig = require("../config/kakaoConfig");
const {user: User, role: Role, refreshToken: RefreshToken} = db;
// const Op = db.Sequelize.Op;
const authService = require("../service/authService");
const {authJwt} = require("../middleware");
const kakao = kakaoConfig;

/*** 이메일 중복확인 ***/
exports.emailCheck = async (req, res) => {
    try {
        const userEmail = req.body.email;
        if (userEmail == undefined || userEmail == "") {
            throw Error("Wrong Parameters");
        }
        await authService.emailCheck(userEmail);
        res.status(200).json({result: 'ok', message: 'Email Check Successfully.'});
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 회원가입 ***/
exports.signUp = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if ((email == undefined || email == "") || (password == undefined || password == "")) {
            throw Error("Wrong Parameters");
        }
        const userAccount = {email, password};

        const response = await authService.signUp(userAccount);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 로그인 ***/
exports.signIn = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if ((email == undefined || email == "") || (password == undefined || password == "")) {
            throw Error("Wrong Parameters");
        }
        const userAccount = {email, password};

        const response = await authService.signIn(userAccount);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 닉네임, 성격, 장르 선택하기 ***/
exports.signInDetail = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const nickname = req.body.nickname;
        const personality1 = req.body.personality1;
        const personality2 = req.body.personality2;
        const personality3 = req.body.personality3;
        const genre1 = req.body.genre1;
        const genre2 = req.body.genre2;
        const genre3 = req.body.genre3;

        if ((nickname == undefined || nickname == "") || (personality1 == undefined || personality1 == "") ||
            (personality2 == undefined || personality2 == "") || (personality3 == undefined || personality3 == "") ||
            (genre1 == undefined || genre1 == "") || (genre2 == undefined || genre2 == "") || (genre3 == undefined || genre3 == ""))
        {
            throw Error("Wrong Parameters");
        }
        const userAccount = {nickname, personality1, personality2, personality3, genre1, genre2, genre3};

        const response = await authService.signInDetail(userAccount, userId);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** refreshtoken 재발행 ***/
exports.refreshToken = async (req, res) => {
    try {
        const requestToken = req.body.refreshToken;
        if (requestToken == undefined || requestToken == "") {
            throw Error("Wrong Parameters");
        }

        const response = await authService.refreshToken(requestToken);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }

};
/*** 로그아웃 ***/
exports.logout = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));

        const response = await authService.logout(userId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 카카오 로그인 회원가입 ***/
exports.kakaoAuth = (req, res) => {
    const kakaoAuthURL = `${kakao.authURL}/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code`;
    return res.redirect(kakaoAuthURL);
};
exports.kakaoCallBack = async (req, res) => {

    const {code} = req.query;
    try {
        const response = await authService.kakaoCallBack(code);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};


