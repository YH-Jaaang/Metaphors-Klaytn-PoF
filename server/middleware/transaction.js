const Blockchain = require('../config/blockchain');
const Caver = require('caver-js');
const caver = new Caver(Blockchain.URI);
const TokenCaPath = '../../truffle/address/MetaphorsToken';
const TokenSalesCaPath = '../../truffle/address/TokenSales';
const MetaphorsTokenABI = require('../../truffle/abi/MetaphorsToken.json')
const MetaphorsTokenSalesABI = require('../../truffle/abi/TokenSales.json')
const fs = require('fs');
const path = require('path');
const {transaction} = require("./index");

this.caverInstance = {
    tokenContract: undefined,
    tokenSalesContract: undefined,
    wallet: undefined,
    owner: undefined
}

initCaver = async (privKey) => {
    if (this.caverInstance.tokenContract == undefined) {
        const buf = fs.readFileSync(path.join(__dirname, TokenCaPath));
        const ca = buf.toString().split(/\n/)[0];

        this.caverInstance.tokenContract = new caver.contract.create(MetaphorsTokenABI.abi, ca);
    }

    if (this.caverInstance.tokenSalesContract == undefined) {
        const buf = fs.readFileSync(path.join(__dirname, TokenSalesCaPath));
        const ca = buf.toString().split(/\n/)[0];

        this.caverInstance.tokenSalesContract = new caver.contract.create(MetaphorsTokenSalesABI.abi, ca);
    }

    if (this.caverInstance.wallet == undefined) {
        this.caverInstance.wallet = caver.wallet;
        const feePayer = caver.wallet.keyring.createFromPrivateKey(privKey);
        this.caverInstance.wallet.add(feePayer);
        this.caverInstance.owner = feePayer;
    }
}

wallet = async () => {
    const keyring = await caver.wallet.keyring.generate();
    return keyring;
};

txSend = async (userPrivKey, funcName, value) => {
    const executor = caver.wallet.keyring.createFromPrivateKey(userPrivKey);

    if (!this.caverInstance.wallet.isExisted(executor.address.toString())) {
        this.caverInstance.wallet.add(executor);
    }

    let returnValue;

    if(funcName == 'setApprovalForAll') {
        value = [this.caverInstance.tokenSalesContract._address, true];
    }

    switch (value.length) {
        case 5:
            returnValue = await sendTxWith5Params(executor, funcName, value);
            break;
        case 3:
            returnValue = await sendTxWith3Params(executor, funcName, value);
            break;
        case 2:
            returnValue = await sendTxWith2Params(executor, funcName, value);
            break;
        case 1:
            returnValue = await sendTxWith1Param(executor, funcName, value);
            break;
    }

    return {result: 'ok', message: "Success Transaction send.", returnValue};
};

txPayableSend = async (userPrivKey, funcName, value, klay) => {
    const executor = caver.wallet.keyring.createFromPrivateKey(userPrivKey);

    if (!this.caverInstance.wallet.isExisted(executor.address.toString())) {
        this.caverInstance.wallet.add(executor);
    }

    let response;
    if(funcName == 'transferToOwner') {
        const returnValue = await this.caverInstance.tokenContract.send({
            from: executor.address,
            feeDelegation: true,
            feePayer: this.caverInstance.owner.address,
            gas: 1000000,
            value: caver.utils.toPeb(klay, "KLAY"),
        }, funcName, value[0]);
        response =  {result: 'ok', message: "Success Transaction send.", returnValue};
    } else if(funcName == 'purchaseToken') {
        const returnValue = await this.caverInstance.tokenSalesContract.send({
            from: executor.address,
            feeDelegation: true,
            feePayer: this.caverInstance.owner.address,
            gas: 1000000,
            value: caver.utils.toPeb(klay, "KLAY"),
        }, funcName, value[0]);

        response =  {result: 'ok', message: "Success Transaction send.", returnValue};
    }

    return response;
};

txSendForTokenSales = async (userPrivKey, funcName, value) => {
    const executor = caver.wallet.keyring.createFromPrivateKey(userPrivKey);

    if (!this.caverInstance.wallet.isExisted(executor.address.toString())) {
        this.caverInstance.wallet.add(executor);
    }

    let response;

    switch (value.length) {
        case 2:
            response = await sendTxWith2ParamsForTokenSales(executor, funcName, value);
            break;
        case 1:
            response = await sendTxWith1ParamForTokenSales(executor, funcName, value);
            break;
    }

    return response;
};

txCall = async (funcName, value) => {
    let response;

    if(funcName == 'isApprovedForAll') {
        value.push(this.caverInstance.tokenSalesContract._address);
    }

    switch (value.length) {
        case 2:
            response = await callTxWith2Params(funcName, value);
            break;
        case 1:
            response = await callTxWith1Param(funcName, value);
            break;
        case 0:
            response = await callTxWithoutParams(funcName);
            break;
    }

    return response;
};

txCallForTokenSales = async (funcName, value) => {
    await initCaver();

    let response;

    switch (value.length) {
        case 1:
            response = await callTxWith1ParamForTokenSales(funcName, value);
            break;
        case 0:
            response = await callTxWithoutParamsForTokenSales(funcName);
            break;
    }

    return response;
};

callTxWith2Params = async (funcName, value) => {
    const returnValue = await this.caverInstance.tokenContract.call(
        funcName,
        value[0],
        value[1]
    );

    return {result: 'ok', message: "Success Transaction Call.", returnValue};
}

callTxWith1Param = async (funcName, value) => {
    const returnValue = await this.caverInstance.tokenContract.call(
        funcName,
        value[0]
    );

    return {result: 'ok', message: "Success Transaction Call.", returnValue};
}

callTxWithoutParams = async (funcName) => {
    const returnValue = await this.caverInstance.tokenContract.call(
        funcName
    );

    return {result: 'ok', message: "Success Transaction Call.", returnValue};
}

callTxWith1ParamForTokenSales = async (funcName, value) => {
    const returnValue = await this.caverInstance.tokenSalesContract.call(
        funcName,
        value[0]
    );

    return {result: 'ok', message: "Success Transaction Call.", returnValue};
}

callTxWithoutParamsForTokenSales = async (funcName) => {
    const returnValue = await this.caverInstance.tokenSalesContract.call(
        funcName
    );

    return {result: 'ok', message: "Success Transaction Call.", returnValue};
}

sendTxWith5Params = async (executor, funcName, value) => {
    const returnValue = await this.caverInstance.tokenContract.send({
        from: executor.address,
        feeDelegation: true,
        feePayer: this.caverInstance.owner.address,
        gas: 1000000,
    }, funcName, value[0], value[1], value[2], value[3], value[4]);

    return {result: 'ok', message: "Success Transaction send.", returnValue};
}

sendTxWith3Params = async (executor, funcName, value) => {
    const returnValue = await this.caverInstance.tokenContract.send({
        from: executor.address,
        feeDelegation: true,
        feePayer: this.caverInstance.owner.address,
        gas: 1000000,
    }, funcName, value[0], value[1], value[2]);

    return {result: 'ok', message: "Success Transaction send.", returnValue};
}

sendTxWith2Params = async (executor, funcName, value) => {
    const returnValue = await this.caverInstance.tokenContract.send({
        from: executor.address,
        feeDelegation: true,
        feePayer: this.caverInstance.owner.address,
        gas: 1000000,
    }, funcName, value[0], value[1]);

    return returnValue;
}

sendTxWith1Param = async (executor, funcName, value) => {
    const returnValue = await this.caverInstance.tokenContract.send({
        from: executor.address,
        feeDelegation: true,
        feePayer: this.caverInstance.owner.address,
        gas: 1000000,
    }, funcName, value[0]);

    return  returnValue;
}

sendTxWith2ParamsForTokenSales = async (executor, funcName, value) => {
    const returnValue = await this.caverInstance.tokenSalesContract.send({
        from: executor.address,
        feeDelegation: true,
        feePayer: this.caverInstance.owner.address,
        gas: 1000000,
    }, funcName, value[0], value[1]);

    return {result: 'ok', message: "Success Transaction send.", returnValue};
}

sendTxWith1ParamForTokenSales = async (executor, funcName, value) => {
    const returnValue = await this.caverInstance.tokenSalesContract.send({
        from: executor.address,
        feeDelegation: true,
        feePayer: this.caverInstance.owner.address,
        gas: 1000000,
    }, funcName, value[0]);

    return {result: 'ok', message: "Success Transaction send.", returnValue};
}

getBalance = async (userPubKey) => {
    return await caver.klay.getBalance(userPubKey) / (10 ** 18);
};

sendValueTransfer = async (userPubKey, value) => {

    const valueTransfer = await new caver.transaction.valueTransfer({
        from: this.caverInstance.owner.address,
        to: userPubKey,
        value: caver.utils.toPeb(value, 'KLAY'),
        gas: 1000000,
    })

    await valueTransfer.sign(this.caverInstance.owner);

    await caver.rpc.klay.sendRawTransaction(valueTransfer);
};

payableSmartContract = async (userPrivKey) => {
    const executor = await caver.wallet.keyring.createFromPrivateKey(userPrivKey);

    if (this.caverInstance.wallet === undefined) {
        this.caverInstance.wallet = await caver.wallet.add(executor);
    }

    caver.klay.sendTransaction({
        type: 'SMART_CONTRACT_EXECUTION',
        from: executor.address,
        to: '',//contract ca
        //data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
        gas: 1000000,
        value: caver.utils.toPeb(1, 'KLAY'),
    }).then((receipt) => {

    });

};

ipfsUpload = async (imgURI) => {

    await caver.ipfs.setIPFSNode('ipfs.infura.io', 5001, true);
    const cid = await caver.ipfs.add(imgURI);

    return 'https://ipfs.infura.io/ipfs/' + cid;;
};

ipfsDownload = async (imgPath) => {

    await caver.ipfs.setIPFSNode('ipfs.infura.io', 5001, true);
    const content = await caver.ipfs.get(imgPath);

    return content;
};

const trasaction = {
    initCaver: initCaver,
    txSend: txSend,
    txPayableSend: txPayableSend,
    txSendForTokenSales: txSendForTokenSales,
    txCall: txCall,
    txCallForTokenSales: txCallForTokenSales,
    wallet: wallet,
    getBalance: getBalance,
    sendValueTransfer, sendValueTransfer,
    ipfsUpload: ipfsUpload,
    ipfsDownload: ipfsDownload
};

module.exports = trasaction;
