const router = require('express').Router();
const purchaseController = require("../controller/purchaseController");

/*** 쿠키 충전 요청 ***/
router.post("/cookie", purchaseController.chargeCookie);

/*** 토큰 구매 요청***/
router.post("/token", purchaseController.chargeToken);

module.exports = router;
