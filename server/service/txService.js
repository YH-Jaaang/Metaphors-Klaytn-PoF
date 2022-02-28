const transaction = require('../middleware/transaction');

// 아이템 반환
exports.getItem = async(user, name) => {
    const tokenInfo = (await this.getTokenInfo(name)).returnValue;
    const myTokenId = (await getTokenId(user, tokenInfo.name)).returnValue;
    const myTokenInfo = (await getToken(myTokenId)).returnValue;
    const tokenPrice = (await getTokenPrice(myTokenId)).returnValue;

    const info = {
        id: myTokenId,
        name: tokenInfo.name,
        imageURI: myTokenInfo.imageURI,
        durability: myTokenInfo.durability,
        maxDurability: tokenInfo.maxDurability,
        isFreeToken: tokenInfo.isFreeToken,
        price : tokenPrice
    };

    return info;
}

// 내 아이템 보기
exports.getAllMyItems = async(user) => {
    const getNameReponse = (await getAllTokenNamesOfUser(user)).returnValue;

    const tokenNames = getNameReponse;

    let tokenInfos = [];

    for(let i=0; i<tokenNames.length; i++) {
        const tokenInfo = (await this.getTokenInfo(tokenNames[i])).returnValue;
        const myTokenId = (await getTokenId(user, tokenInfo.name)).returnValue;
        const myTokenInfo = (await getToken(myTokenId)).returnValue;
        const tokenPrice = (await getTokenPrice(myTokenId)).returnValue;

        const info = {
            id: myTokenId,
            name: tokenInfo.name,
            imageURI: myTokenInfo.imageURI,
            durability: myTokenInfo.durability,
            maxDurability: tokenInfo.maxDurability,
            isFreeToken: tokenInfo.isFreeToken,
            price : tokenPrice
        };

        tokenInfos.push(info);
    }

    return tokenInfos;
}

// 판매 중인 아이템 보기
exports.getAllItemsOnSale = async() => {
    const getTokenIdOnSalesReponse = (await getTokenIdOnSales()).returnValue;
    const tokenIds = getTokenIdOnSalesReponse;

    let tokenInfos = [];

    for(let i=0; i<tokenIds.length; i++) {
        const token = (await getToken(tokenIds[i])).returnValue;
        const tokenInfo = (await this.getTokenInfo(token.name)).returnValue;
        const tokenPrice = (await getTokenPrice(tokenIds[i])).returnValue;

        const info = {
            id: tokenIds[i],
            name: token.name,
            imageURI: token.imageURI,
            durability: token.durability,
            maxDurability: tokenInfo.maxDurability,
            price : tokenPrice,
        };

        tokenInfos.push(info);
    }

    return tokenInfos;
}

// 아이템 생성 금액 전송하기
exports.transferToOwner = async(userPrivKey, name, klay) => {
    const funcName = "transferToOwner";
    const value = [name];
    const response = await transaction.txPayableSend(userPrivKey, funcName, value, klay);

    return response;
}

// 아이템 생성하기
exports.createToken = async(userPrivKey, name) => {
    const funcName = "createToken";
    const value = [name];
    const response = await transaction.txSend(userPrivKey, funcName, value);

    return response;
}

// 이미지 URI 값 편집하기 - 이미지 생성하기 인터페이스 중 일부
exports.editTokenImage = async(userPrivKey, name, imageURI) => {
    const funcName = "editTokenImage";
    const value = [name, imageURI];
    const response = await transaction.txSend(userPrivKey, funcName, value);

    return response;
}

// 아이템 사용하기
exports.useTokenNotOnSale = async(userPrivKey, userPubKey, name) => {
    const myTokenId = (await getTokenId(userPubKey, name)).returnValue;
    const tokenPrice = (await getTokenPrice(myTokenId)).returnValue;

    if(tokenPrice != 0) {
        return {result: 'fail', message: "Token is on sale."};
    }

    const response = await useToken(userPrivKey, name);

    return response;
}

// 아이템 판매 등록
exports.setForSale = async(userPrivKey, userPubKey, tokenId, price) => {
    const isApproval = (await isApprovedForAll(userPubKey)).returnValue;

    if(isApproval == false) {
        await setApprovalForAll(userPrivKey);
    }

    const funcName = "setForSale";
    const value = [tokenId, price];

    const response = await transaction.txSendForTokenSales(userPrivKey, funcName, value);

    return response;
}

// 아이템 판매 등록 취소
exports.removeTokenOnSales = async(userPrivKey, tokenId) => {
    const funcName = "removeTokenOnSales";
    const value = [tokenId];
    const response = await transaction.txSendForTokenSales(userPrivKey, funcName, value);

    return response;
}

// 아이템 구매하기
exports.purchaseToken = async(userPrivKey, userPubKey, tokenId) => {
    const isApproval = (await isApprovedForAll(userPubKey)).returnValue;
    const userBalance = await transaction.getBalance(userPubKey);
    const itemPrice = (await getTokenPrice(tokenId)).returnValue;

    if(isApproval == false) {
        await setApprovalForAll(userPrivKey);
    }
    if (userBalance < itemPrice) {
        throw Error('You don`t have enough Klay.');
    }
    const funcName = "purchaseToken";
    const value = [tokenId];
    const response = await transaction.txPayableSend(userPrivKey, funcName, value, itemPrice);

    return response;
}
//해당 아이템 소유자
exports.ownerOf = async(id) => {
    const funcName = "ownerOf";
    const value = [id];
    const response = await transaction.txCall(funcName, value);

    return response;
}











/*** MetaphorsTokenInfo ***/
exports.createTokenInfo = async(userPrivKey, name, totalCount, percentage, maxDurability, isFreeToken) => {
    const funcName = "createTokenInfo";
    const value = [name, totalCount, percentage, maxDurability, isFreeToken];
    const response = await transaction.txSend(userPrivKey, funcName, value);

    return response;
}

exports.getTokenInfo = async(name) => {
    const funcName = "getTokenInfo";
    const value = [name];
    const response = await transaction.txCall(funcName, value);

    const returnValue = {
        "name": response.returnValue[0],
        "totalCount": response.returnValue[1],
        "percentage": response.returnValue[2],
        "maxDurability": response.returnValue[3],
        "isFreeToken": response.returnValue[4]
    }

    response.returnValue = returnValue;

    return response;
}

exports.getAllTokenInfoNames = async() => {
    const funcName = "getAllTokenInfoNames";
    const response = await transaction.txCall(funcName, []);

    return response;
}

exports.editTokenInfo = async(userPrivKey, name, totalCount, percentage) => {
    const funcName = "editTokenInfo";
    const value = [name, totalCount, percentage];
    const response = await transaction.txSend(userPrivKey, funcName, value);

    return response;
}

/*** MetaphorsToken ***/
// exports.createToken = async(userPrivKey, name, klay) => {
//     const funcName = "createToken";
//     const value = [name];
//     const response = await transaction.txPayableSend(userPrivKey, funcName, value, klay);
//
//     return response;
// }

// exports.editTokenImage = async(userPrivKey, name, imageURI) => {
//     const funcName = "editTokenImage";
//     const value = [name, imageURI];
//     const response = await transaction.txSend(userPrivKey, funcName, value);
//
//     return response;
// }

useToken = async(userPrivKey, name) => {
    const funcName = "useToken";
    const value = [name];
    const response = await transaction.txSend(userPrivKey, funcName, value);

    return response;
}

getAllTokenNamesOfUser = async(user) => {
    const funcName = "getAllTokenNamesOfUser";
    const value = [user];
    const response = await transaction.txCall(funcName, value);

    return response;
}

getTokenId = async(user, name) => {
    const funcName = "getTokenId";
    const value = [user, name];
    const response = await transaction.txCall(funcName, value);

    // const returnValue = {
    //     "id": response.returnValue[0],
    //     "durability": response.returnValue[1],
    //     "imageURI": response.returnValue[2],
    //     "dateCreated": response.returnValue[3],
    //     "nonce": response.returnValue[4]
    // }

    // response.returnValue = returnValue;

    return response;
}

exports.getTokenCount = async(name) => {
    const funcName = "getTokenCount";
    const value = [name];
    const response = await transaction.txCall(funcName, value);

    return response;
}

getToken = async(id) => {
    const funcName = "getToken";
    const value = [id];
    const response = await transaction.txCall(funcName, value);

    const returnValue = {
        "name": response.returnValue[0],
        "durability": response.returnValue[1],
        "imageURI": response.returnValue[2]
    }

    response.returnValue = returnValue;

    return response;
}

setApprovalForAll = async(userPrivKey) => {
    const funcName = "setApprovalForAll";
    const response = await transaction.txSend(userPrivKey, funcName, []);

    return response;
}

isApprovedForAll = async(userPubKey) => {
    const funcName = "isApprovedForAll";
    const value = [userPubKey];
    const response = await transaction.txCall(funcName, value);

    return response;
}

exports.approve = async(userPrivKey, userPubKey, tokenId) => {
    const funcName = "approve";
    const value = [userPubKey, tokenId];
    const response = await transaction.txSend(userPrivKey, funcName, value);

    return response;
}

exports.getApproved = async(tokenId) => {
    const funcName = "getApproved";
    const value = [tokenId];
    const response = await transaction.txCall(funcName, value);

    return response;
}

/*** TokenSales ***/


getTokenIdOnSales = async() => {
    const funcName = "getTokenIdOnSales";
    const response = await transaction.txCallForTokenSales(funcName, []);

    return response;
}

getTokenPrice = async(tokenId) => {
    const funcName = "getTokenPrice";
    const value = [tokenId];
    const response = await transaction.txCallForTokenSales(funcName, value);

    return response;
}

// exports.useTokenNotOnSale = async(userPrivKey, tokenId) => {
//     const funcName = "useTokenNotOnSale";
//     const value = [tokenId];
//     const response = await transaction.txSendForTokenSales(userPrivKey, funcName, value);
//
//     return response;
// }