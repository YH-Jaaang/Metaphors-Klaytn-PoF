const router = require('express').Router();
const blockchainController = require("../controller/blockchainController");

/*** 보유 중인 모든 NFT 아이템 목록 반환 요청(블록체인) Service ***/
router.get("/getAllMyItems", blockchainController.getAllMyItems);
router.get("/getAllItemsOnSale", blockchainController.getAllItemsOnSale);
router.get("/getItem", blockchainController.getItem);
router.post("/createToken", blockchainController.createToken);
router.post("/editTokenImage", blockchainController.editTokenImage);
router.post("/useTokenNotOnSale", blockchainController.useTokenNotOnSale);


/*** MetaphorsTokenInfo.sol ***/
router.post("/createTokenInfo", blockchainController.createTokenInfo);
router.get("/getAllTokenInfoNames", blockchainController.getAllTokenInfoNames);
router.post("/editTokenInfo", blockchainController.editTokenInfo);

/*** TokenSales.sol ***/
router.post("/setForSale", blockchainController.setForSale);
router.post("/removeTokenOnSales", blockchainController.removeTokenOnSales);
router.post("/purchaseToken", blockchainController.purchaseToken);









//
//
// /*** MetaphorsToken.sol ***/
//
// router.get("/getAllTokenNamesOfUser", blockchainController.getAllTokenNamesOfUser);
// router.get("/getTokenOfUser", blockchainController.getTokenOfUser);
// router.get("/getTokenCount", blockchainController.getTokenCount);
// router.get("/getTokenName", blockchainController.getTokenName);
// router.post("/setApprovalForAll", blockchainController.setApprovalForAll);
// router.get("/isApprovedForAll", blockchainController.isApprovedForAll);
// router.post("/approve", blockchainController.approve);
// router.get("/getApproved", blockchainController.getApproved);
//
// /*** TokenSales.sol ***/
// router.post("/setForSale", blockchainController.setForSale);
// router.post("/purchaseToken", blockchainController.purchaseToken);
// router.post("/removeTokenOnSales", blockchainController.removeTokenOnSales);
// router.get("/getTokenIdOnSales", blockchainController.getTokenIdOnSales);
// router.get("/getTokenPrice", blockchainController.getTokenPrice);


// router.get("/getAllTokenNamesOfUser", blockchainController.getAllTokenNamesOfUser);
// router.get("/getTokenOfUser", blockchainController.getTokenOfUser);
// router.get("/getTokenCount", blockchainController.getTokenCount);

module.exports = router;
