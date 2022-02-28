const router = require('express').Router();
const nonUserController = require("../controller/nonUserController");


/*** 소설 목록 반환 요청 (비회원) ***/
router.get("/novel/list", nonUserController.novelList);

module.exports = router;
