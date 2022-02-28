const txService= require("../service/txService");
const Blockchain = require("../config/blockchain");

/*** TokenInfo ***/
/*** TokenInfo 생성 - onlyOwner ***/
exports.createTokenInfo = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const name = req.body.name;
        const totalCount = req.body.totalCount;
        const percentage = req.body.percentage;
        const maxDurability = req.body.maxDurability;
        const isFreeToken = req.body.isFreeToken;

        if(
            (privKey == undefined || privKey == "") ||
            (name == undefined || name == "") ||
            (totalCount == undefined || totalCount == 0 || totalCount > 65535) ||
            (percentage == undefined || percentage == 0 || percentage > 100) ||
            (maxDurability == undefined || maxDurability == 0 || maxDurability > 255) ||
            (isFreeToken == undefined)
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.createTokenInfo(privKey, name, totalCount, percentage, maxDurability, isFreeToken);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}
/*** 모든 TokenInfo 이름 조회 ***/
exports.getAllTokenInfoNames = async (req, res) => {
    try {
        const response = await txService.getAllTokenInfoNames();

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}
/*** TokenInfo 정보 수정 - onlyOwner ***/
exports.editTokenInfo = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const name = req.body.name;
        const totalCount = req.body.totalCount;
        const percentage = req.body.percentage;

        if(
            (privKey == undefined || privKey == "") ||
            (name == undefined || name == "") ||
            (totalCount == undefined || totalCount == 0 || totalCount > 65535) ||
            (percentage == undefined || percentage == 0 || percentage > 100)
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.editTokenInfo(privKey, name, totalCount, percentage);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** 보유 중인 NFT 아이템 목록 반환 요청(블록체인) ***/
exports.getItem = async (req, res) => {
    try {
        const user = req.body.user;
        const name = req.body.name;

        if (
            user == undefined || user == "" ||
            name == undefined || name == ""
        ) {
            throw Error("Wrong Parameters");
        }

        const response = await txService.getItem(user, name);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};

/*** 보유 중인 NFT 아이템 목록 반환 요청(블록체인) ***/
exports.getAllMyItems = async (req, res) => {
    try {
        const user = req.body.user;

        if (user == undefined || user == "") {
            throw Error("Wrong Parameters");
        }

        const response = await txService.getAllMyItems(user);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};

/*** 보유 중인 NFT 아이템 목록 반환 요청(블록체인) ***/
exports.getAllItemsOnSale = async (req, res) => {
    try {
        const response = await txService.getAllItemsOnSale();
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};

/*** Token 생성 ***/
exports.createToken = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const name = req.body.name;

        if(
            (privKey == undefined || privKey == "") ||
            (name == undefined || name == "")
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.createToken(privKey, name, 1);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** Token 이미지 편집 ***/
exports.editTokenImage = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const name = req.body.name;
        const imageURI = req.body.imageURI;

        if(
            (privKey == undefined || privKey == "") ||
            (name == undefined || name == "") ||
            (imageURI == undefined || imageURI == "")
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.editTokenImage(privKey, name, imageURI);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** Token 사용 ***/
exports.useTokenNotOnSale = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const pubKey = req.body.pubKey;
        const name = req.body.name;

        if(
            (privKey == undefined || privKey == "") ||
            (pubKey == undefined || pubKey == "") ||
            (name == undefined || name == "")
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.useTokenNotOnSale(privKey, pubKey, name);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** Token 판매 등록 ***/
exports.setForSale = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const pubKey = req.body.pubKey;
        const tokenId = req.body.tokenId;
        const price = req.body.price;

        if(
            (privKey == undefined || privKey == "") ||
            (pubKey == undefined || pubKey == "") ||
            (tokenId == undefined || tokenId <= 0) ||
            (price == undefined || price <= 0)
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.setForSale(privKey, pubKey, tokenId, price);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** Token 판매 등록 취소 ***/
exports.removeTokenOnSales = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const tokenId = req.body.tokenId;

        if(
            (privKey == undefined || privKey == "") ||
            (tokenId == undefined || tokenId <= 0)
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.removeTokenOnSales(privKey, tokenId);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}

/*** Token 구매 ***/
exports.purchaseToken = async (req, res) => {
    try {
        const privKey = req.body.privKey;
        const pubKey = req.body.pubKey;
        const tokenId = req.body.tokenId;
        const price = req.body.price;

        if(
            (privKey == undefined || privKey == "") ||
            (pubKey == undefined || pubKey == "") ||
            (tokenId == undefined || tokenId <= 0) ||
            (price == undefined || price <= 0)
        ) {
            throw "Wrong Parameters";
        }

        const response = await txService.purchaseToken(privKey, pubKey, tokenId, price);

        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}
