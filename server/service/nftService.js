const db = require("../models");
const {transaction} = require("../middleware");
const {user: User} = db;
const {
    getAllItemsOnSale,
    ownerOf,
    getAllMyItems,
    purchaseToken,
    setForSale,
    removeTokenOnSales
} = require("./txService");
const {sortByName, sortByPrice} = require("../middleware/sort");

/*** 판매 중인 NFT 아이템 목록 반환 요청 ***/
exports.sellingItems = async () => {
    let resultParsing = [];
    let returnItems = [];
    const result = await getAllItemsOnSale();

    await Promise.all(result.map(async (value, i) => {
        const userPubKey = (await ownerOf(result[i].id)).returnValue;

        const user = await User.findOne({
            attributes: ['nickname'], where: {address: userPubKey},
        });
        resultParsing[i] = {
            id: result[i].id,
            name: result[i].name,
            imageURI: result[i].imageURI,
            durability: result[i].durability,
            maxDurability: result[i].maxDurability,
            price: result[i].price,
            ownerNickname: user.nickname
        }
        returnItems.push(resultParsing[i]);
    }));

    //await sortByPrice(resultParsing);
    await sortByName(returnItems);

    const response = {result: 'ok', content: returnItems};

    return response;
};
/*** 이름으로 판매 중인 아이템 검색 요청 ***/
exports.seachSaleItems = async (name, exceptOwnerItem,userId) => {

    let returnItems = [];
    let resultParsing = [];
    const result = await getAllItemsOnSale();

    const userPubKeyDb = await User.findOne({
        attributes: ['address'], where: {id: userId},
    });
    //내가 판매중인 물품 제외
    if (exceptOwnerItem == true) {
        await Promise.all(result.map(async (value, i) => {
            const userPubKey = ((await ownerOf(result[i].id)).returnValue).toLowerCase();
            console.log(userPubKey,'-' ,userPubKeyDb.address);
            const user = await User.findOne({
                attributes: ['nickname'], where: {address: userPubKey},
            });
            if (result[i].name.includes(name) && userPubKey != userPubKeyDb.address){
                resultParsing[i] = {
                    id: result[i].id,
                    name: result[i].name,
                    imageURI: result[i].imageURI,
                    durability: result[i].durability,
                    maxDurability: result[i].maxDurability,
                    price: result[i].price,
                    ownerNickname: user.nickname
                }
                returnItems.push(resultParsing[i]);
            }
        }));
    } else {
        await Promise.all(result.map(async (value, i) => {
            if (result[i].name.includes(name)){
                const userPubKey = (await ownerOf(result[i].id)).returnValue;
                const user = await User.findOne({
                    attributes: ['nickname'], where: {address: userPubKey},
                });
                resultParsing[i] = {
                    id: result[i].id,
                    name: result[i].name,
                    imageURI: result[i].imageURI,
                    durability: result[i].durability,
                    maxDurability: result[i].maxDurability,
                    price: result[i].price,
                    ownerNickname: user.nickname
                }
                returnItems.push(resultParsing[i]);
            }
        }));
    }

    await sortByName(returnItems);

    const response = {result: 'ok', content: returnItems};

    return response;
};
/*** 내가 판매 중인 NFT 아이템 목록 반환 요청 ***/
exports.userSellingItems = async (userId) => {
    let returnItem = [];

    const user = await User.findOne({
        attributes: ['address'], where: {id: userId},
    });
    const result = await getAllMyItems(user.address);

    await sortByName(result);

    await Promise.all(result.map((value) => {
        if (value.price != 0)
            returnItem.push(value);
    }));

    const response = {result: 'ok', content: returnItem};

    return response;
};
/*** NFT 아이템 구매 요청 ***/
exports.purchaseItems = async (userId, tokenId) => {

    const user = await User.findOne({
        attributes: ['privateKey', 'address'], where: {id: userId},
    });
    const result = await purchaseToken(user.privateKey, user.address, tokenId);
    const userBalance = await transaction.getBalance(user.address);

    const response = {
        result: 'ok',
        message: 'Successful Nft item purchase request.',
        balanceOfklay: userBalance,
        content: result
    };

    return response;
};
/*** NFT 아이템 판매 등록 요청 ***/
exports.registerSellItems = async (userId, tokenId, price) => {

    const user = await User.findOne({
        attributes: ['privateKey', 'address'], where: {id: userId},
    });
    const result = await setForSale(user.privateKey, user.address, tokenId, price);

    const response = {result: 'ok', message: 'Successful Nft item purchase request.', content: result};

    return response;
};
/*** NFT 아이템 판매 등록 취소 요청***/
exports.cancelSellItems = async (userId, tokenId) => {

    const user = await User.findOne({
        attributes: ['privateKey'], where: {id: userId},
    });
    await removeTokenOnSales(user.privateKey, tokenId);

    const response = {result: 'ok', message: 'Successful NFT item sales cancellation.'};

    return response;
};