const transaction = require('../middleware/transaction');
const {sortByName, sortByPrice} = require('../middleware/sort');
const db = require("../models");
const {user: User} = db;
const {getTokenCount, getTokenInfo, transferToOwner, createToken, editTokenImage, getAllMyItems} = require("./txService");

/*** NFT 아이템 생산 요청(블록체인) Service ***/
exports.createItem = async (userId, name, klay) => {
    let results;
    let response;

    const user = await User.findOne({
            attributes: ['privateKey', 'address'],
            where: {id: userId}
        }
    );
    const tokenCount = (await getTokenCount(name)).returnValue;
    const tokenTotalCount = (await getTokenInfo(name)).returnValue.totalCount;

    if(tokenCount < tokenTotalCount){
        const resultTransfer = await transferToOwner(user.privateKey, name, klay);

        if(resultTransfer.result === 'ok')
            results = await createToken(user.privateKey, name);

        const userBalance = await transaction.getBalance(user.address);

        response = {
            result: 'ok',
            message: 'Successful NFT item creation.',
            balanceOfklay: userBalance,
            content: results
        };
    }
    else{
        response = {
            result: 'fail',
            message: 'tokenCount must be lower than totalCount',
        };
    }

    return response;
};
/*** NFT 아이템 생산 이후 이미지 저장 요청 (IPFS) Service ***/
exports.imgCreate = async (userId, name, imgURI) => {

    const user = await User.findOne({
            attributes: ['privateKey'],
            where: {id: userId}
        }
    );
    const imgPath = await transaction.ipfsUpload(Buffer.from(imgURI));
    const result = await editTokenImage(user.privateKey, name, imgPath);

    const response = {result: 'ok', message: "Success Transaction send.", content: result};

    return response;

};
/*** NFT 아이템 목록 반환 요청(블록체인) Service ***/
exports.itemInfo = async (userId) => {

    const user = await User.findOne({
            attributes: ['address'],
            where: {id: userId}
        }
    );
    const result = await getAllMyItems(user.address);

    await sortByName(result);
    await sortByPrice(result);

    const content = {
        items: result
    };

    const response = {result: 'ok', content: content};

    return response;
};


