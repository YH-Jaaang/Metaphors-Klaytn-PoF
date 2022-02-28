const nftService= require("../service/nftService");
const jwt = require("jsonwebtoken");
const {authJwt} = require("../middleware");

/*** 판매 중인 NFT 아이템 목록 반환 요청 ***/
exports.sellingItems = async (req, res) => {
    try {
        const response = await nftService.sellingItems();
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};

/*** 이름으로 판매 중인 아이템 검색 요청 ***/
exports.seachSaleItems = async (req, res) => {
    try {
        const name = req.body.name;
        const exceptOwnerItem = req.body.exceptOwnerItem;
        const userId = authJwt.accessToken(req.header('x-access-token'));
        if(
            (name == undefined) ||(exceptOwnerItem == undefined) || (userId == undefined)
        ) {
            throw Error("Wrong Parameters");
        }

        const response = await nftService.seachSaleItems(name, exceptOwnerItem, userId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};

/*** 내가 판매 중인 NFT 아이템 목록 반환 요청 ***/
exports.userSellingItems = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));

        const response = await nftService.userSellingItems(userId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** NFT 아이템 구매 요청 ***/
exports.purchaseItems = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const tokenId = req.body.tokenId;

        if(
            (tokenId == undefined || tokenId <= 0)
        ) {
            throw Error("Wrong Parameters");
        }

        const response = await nftService.purchaseItems(userId, tokenId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** NFT 아이템 판매 등록 요청 ***/
exports.registerSellItems = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const tokenId = req.body.tokenId;
        const price = req.body.price;
        if(
            (tokenId == undefined || tokenId <= 0) ||
            (price == undefined || price <= 0)
        ) {
            throw Error("Wrong Parameters");
        }

        const response = await nftService.registerSellItems(userId, tokenId, price);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** NFT 아이템 판매 등록 취소 요청***/
exports.cancelSellItems = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const tokenId = req.body.tokenId;

        if(
            (tokenId == undefined || tokenId <= 0)
        ) {
            throw Error("Wrong Parameters");
        }

        const response = await nftService.cancelSellItems(userId, tokenId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};