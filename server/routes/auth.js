const router = require('express').Router();
const {verifySignUp} = require("../middleware");
const authController = require("../controller/authController");
const authJwt = require("../middleware/authJwt");

/*** 이메일 중복확인 ***/
router.post("/emailcheck", authController.emailCheck);

/*** 회원가입 ***/
router.post(
    "/signup",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    authController.signUp
);

/*** 로그인 ***/
router.post("/signin", authController.signIn);

/*** 닉네임, 성격, 장르 선택하기 ***/
router.post("/signin/detail", authJwt.verifyToken, authController.signInDetail);

/*** refreshtoken 재발행 ***/
router.post("/refreshtoken", authController.refreshToken);

/*** 로그아웃 ***/
router.post("/logout", authJwt.verifyToken, authController.logout);

/*** 카카오 로그인 회원가입 ***/
router.get('/kakao', authController.kakaoAuth);
router.get('/kakao/callback', authController.kakaoCallBack);

module.exports = router;