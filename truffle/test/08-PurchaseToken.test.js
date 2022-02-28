const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');
const TokenSales = artifacts.require('../contracts/Metaphors/TokenSales');
const Assert = require("truffle-assertions");

contract("TokenSales-PurchaseToken-test", (accounts) => {


    let contractInstance;
    let tokenSalesInstance;
    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    beforeEach(async () => {

        contractInstance = await MetaphorsToken.new();
        tokenSalesInstance = await TokenSales.new(contractInstance.address);

        await contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('투쟁', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('우유', totalCount, percentage, maxDurability, true, {from: accounts[0]});

        await contractInstance.transferToOwner('용기', {from: accounts[0], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[0]}); //tokenId : 1
        await contractInstance.transferToOwner('투쟁', {from: accounts[0], value: 1*10**18});
        await contractInstance.createToken('투쟁', {from: accounts[0]}); //tokenId : 2
        await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[1]}); //tokenId : 3
        await contractInstance.transferToOwner('투쟁', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('투쟁', {from: accounts[1]}); //tokenId : 4
        await contractInstance.transferToOwner('용기', {from: accounts[2], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[2]}); //tokenId : 5
        await contractInstance.transferToOwner('투쟁', {from: accounts[2], value: 1*10**18});
        await contractInstance.createToken('투쟁', {from: accounts[2]}); //tokenId : 6
        await contractInstance.transferToOwner('우유', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('우유', {from: accounts[1]}); //tokenId : 7

        await tokenSalesInstance.setForSale(1, 10, {from: accounts[0]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[0]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[3]})
    });


    describe("PurchaseToken Test", () => {
        it('purchaseToken Test', async () => {

            await tokenSalesInstance.purchaseToken(1,{from: accounts[3], value:10*10**18 });
            newTokenOwner = await contractInstance.ownerOf(1);
            assert.equal(newTokenOwner, accounts[3], 'Token is not purchased');
        });

        it('purchaseToken Test - Check the balance of the token - seller', async () => {

            sellerTokenCount = await contractInstance.balanceOf(accounts[0]);
            await tokenSalesInstance.purchaseToken(1,{from: accounts[3], value:10*10**18 });
            newSellerTokenCount = await contractInstance.balanceOf(accounts[0]);

            diff = sellerTokenCount - newSellerTokenCount;
            assert.equal(diff, 1, 'Token count should be decreased');

        });

        it('purchaseToken Test - Check the balance of the token - buyer', async () => {

            buyerTokenCount = await contractInstance.balanceOf(accounts[3]);
            await tokenSalesInstance.purchaseToken(1,{from: accounts[3], value:10*10**18 });
            newBuyerTokenCount = await contractInstance.balanceOf(accounts[3]);

            diff = newBuyerTokenCount - buyerTokenCount;
            assert.equal(diff, 1, 'Token count should be increased');

        });

        it('purchaseToken Test - Check the balance of the sold token owner\'s account', async () => {
            const price = 10;
            await tokenSalesInstance.setForSale(2, price, {from: accounts[0]});


            beforeBalanceStr = await web3.eth.getBalance(accounts[0]);
            beforeBalance = await web3.utils.fromWei(beforeBalanceStr,'ether');
            await tokenSalesInstance.purchaseToken(2,{from: accounts[3], value:price*10**18 });

            afterBalanceStr = await web3.eth.getBalance(accounts[0]);
            afterBalance = await web3.utils.fromWei(afterBalanceStr,'ether');

            diff = afterBalance - beforeBalance;
            assert.equal(diff, price, 'Balance is not matching');
        });



    });


    describe("PurchaseToken revert Test", () => {

        it('Should be reverted if tokenId is not bigger than 0', async () => {

            await Assert.reverts(
                tokenSalesInstance.purchaseToken(0,{from: accounts[3], value:10*10**18 }),
                '_tokenId must be bigger than 0'
            );
        });

        it('Should be reverted if msg.value is not same with tokenPrice[_tokenId]', async () => {

            await Assert.reverts(
                tokenSalesInstance.purchaseToken(1,{from: accounts[3], value:1*10**18 }),
                'msg.value must be same with tokenPrice[_tokenId]'
            );
        });

        it('Should be reverted if ownerOf(_tokenId) is same with msg.sender', async () => {

            await Assert.reverts(
                tokenSalesInstance.purchaseToken(1,{from: accounts[0], value:10*10**18 }),
                'ownerOf(_tokenId) must not be same with msg.sender'
            );
        });

        it('Should be reverted if msg.sender already has a item named same', async () => {

            await Assert.reverts(
                tokenSalesInstance.purchaseToken(1,{from: accounts[1], value:10*10**18 }),
                'msg.sender already has a item named same'
            );
        });

    });



});



