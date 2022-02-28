const router = require('express').Router();
const itemController = require("../controller/itemController");

/*** NFT 아이템 생산 요청 (블록체인) ***/
router.post("/create", itemController.createItem);

/*** NFT 아이템 생산 이후 이미지 저장 요청 (IPFS) Service ***/
router.post("/img/create", itemController.imgCreate);

/*** NFT 아이템 목록 반환 요청(블록체인) Service ***/
router.get("/info", itemController.itemInfo);


module.exports = router;
