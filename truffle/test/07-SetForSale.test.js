const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');
const TokenSales = artifacts.require('../contracts/Metaphors/TokenSales');
const Assert = require("truffle-assertions");

contract("TokenSales-SetForSale-test", (accounts) => {


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

    });


    describe("SetForSale Test", () => {
        it('setForSale Test - tokenPrice', async () => {
            await tokenSalesInstance.setForSale(1,1, {from: accounts[0]})
            tokenPrice = await tokenSalesInstance.getTokenPrice(1);
            assert.equal(tokenPrice, 1, 'Token price is Error');

        });

        it('setForSale Test - tokenOnSale', async () => {
            await tokenSalesInstance.setForSale(1,1, {from: accounts[0]})
            await tokenSalesInstance.setForSale(3,1, {from: accounts[1]})
            await tokenSalesInstance.setForSale(5,1, {from: accounts[2]})
            tokenOnSale = await tokenSalesInstance.getTokenIdOnSales();

            assert.equal(tokenOnSale[0], 1, 'tokenId 1 does not exist in Array');
            assert.equal(tokenOnSale[1], 3, 'tokenId 3 does not exist in Array');
            assert.equal(tokenOnSale[2], 5, 'tokenId 5 does not exist in Array');


        });

    });

    describe("SetForSale revert Test", () => {
        it('Should be reverted if tokenId is not bigger than 0', async () => {

            await Assert.reverts(
                tokenSalesInstance.setForSale(0,1, {from: accounts[0]}),
                '_tokenId must be bigger than 0'
            );
        });

        it('Should be reverted if price is not bigger than 0', async () => {

            await Assert.reverts(
                tokenSalesInstance.setForSale(1,0, {from: accounts[0]}),
                '_price must be bigger than 0'
            );
        });

        it('Should be reverted if msg.sender is not ownerOf(_tokenId)', async () => {

            await Assert.reverts(
                tokenSalesInstance.setForSale(1,1, {from: accounts[1]}),
                'ownerOf(_tokenId) must be same with msg.sender'
            );
        });

        it('Should be reverted if tokenPrice is not 0', async () => {
            await tokenSalesInstance.setForSale(1,1, {from: accounts[0]}),
            await Assert.reverts(
                tokenSalesInstance.setForSale(1,1, {from: accounts[0]}),
                'tokenPrice[_tokenId] must be 0'
            );
        });

        it('Should be reverted if token is freeToken', async () => {
                await Assert.reverts(
                    tokenSalesInstance.setForSale(7,1, {from: accounts[1]}),
                    'it is free token'
                );
        });

    });



});



