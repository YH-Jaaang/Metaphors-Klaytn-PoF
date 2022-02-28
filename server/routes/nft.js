const router = require('express').Router();
const nftController = require("../controller/nftController");
const authJwt = require("../middleware/authJwt");

/*** 판매 중인 NFT 아이템 목록 반환 요청 ***/
router.get("/forSaleItems", nftController.sellingItems);

/*** 이름으로 판매 중인 아이템 검색 요청 ***/
router.post("/search/saleItems", nftController.seachSaleItems);

/*** 내가 판매 중인 NFT 아이템 목록 반환 요청 ***/
router.get("/forSaleItems/user", authJwt.verifyToken, nftController.userSellingItems);

/*** NFT 아이템 구매 요청 ***/
router.post("/items/purchase", authJwt.verifyToken, nftController.purchaseItems);

/*** NFT 아이템 판매 등록 요청 ***/
router.post("/items/sell", authJwt.verifyToken, nftController.registerSellItems);

/*** NFT 아이템 판매 등록 취소 요청***/
router.post("/items/sell/cancel", authJwt.verifyToken, nftController.cancelSellItems);

module.exports = router;
