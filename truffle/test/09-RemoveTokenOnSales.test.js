const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');
const TokenSales = artifacts.require('../contracts/Metaphors/TokenSales');
const Assert = require("truffle-assertions");

contract("TokenSales-RemoveTokenOnSales-test", (accounts) => {


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

        await tokenSalesInstance.setForSale(1,1, {from: accounts[0]})
        await tokenSalesInstance.setForSale(3,1, {from: accounts[1]})
        await tokenSalesInstance.setForSale(5,1, {from: accounts[2]})

        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[0]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[1]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[2]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[3]})
    });


    describe("RemoveTokenOnSales Test", () => {
        it('RemoveTokenOnSales Test - TokenOnSale', async () => {

            await tokenSalesInstance.removeTokenOnSales(1,{from: accounts[0]});
            tokenOnSale = await tokenSalesInstance.getTokenIdOnSales();

            assert.equal(tokenOnSale[0], 5,'This token should exist');
            assert.equal(tokenOnSale[1], 3,'This token should exist');
            assert.equal(tokenOnSale[2], undefined,'TokensOnSale-list should be finished');

        });

        it('RemoveTokenOnSales Test - Token Price ', async () => {

            await tokenSalesInstance.removeTokenOnSales(1,{from: accounts[0]});
            tokenOnSale = await tokenSalesInstance.getTokenIdOnSales();
            price = await tokenSalesInstance.getTokenPrice(1, {from: accounts[0]});

            assert.equal(price, 0, 'This token is not initialized ' );
        });

    });


    describe("RemoveTokenOnSales revert Test", () => {

        it('Should be reverted if tokenId is not bigger than 0', async () => {

            await Assert.reverts(
                tokenSalesInstance.removeTokenOnSales(0,{from: accounts[0]}),
                '_tokenId must be bigger than 0'
            );
        });

        it('Should be reverted if tokenPrice[_tokenId] is 0', async () => {

            await tokenSalesInstance.removeTokenOnSales(1,{from: accounts[0]});
            price = await tokenSalesInstance.getTokenPrice(1, {from: accounts[0]});
            assert.equal(price, 0, 'This token is not initialized ' );

            await Assert.reverts(
                tokenSalesInstance.removeTokenOnSales(1,{from: accounts[0]}),
                'tokenPrice[_tokenId] must not be 0'
            );
        });

        it('Should be reverted if ownerOf(_tokenId) must be same with msg.sender', async () => {

            await Assert.reverts(
                tokenSalesInstance.removeTokenOnSales(1,{from: accounts[1]}),
                'ownerOf(_tokenId) must be same with msg.sender'
            );
        });

    });



});



