const router = require('express').Router();
const userController = require("../controller/userController");
const authJwt = require("../middleware/authJwt");

router.post("/file_upload", userController.fileUpload);

/*** 사용자 정보 요청 ***/
router.get("/info", authJwt.verifyToken, userController.userInfo);
/*** 장르 목록 요청 ***/
router.get("/genre", userController.genre);
/*** 성격 목록 요청 ***/
router.get("/personality", userController.personality);

module.exports = router;
