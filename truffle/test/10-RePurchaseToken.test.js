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
        await contractInstance.createTokenInfo('우유', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});

        await contractInstance.createToken('용기', {from: accounts[0]}); //tokenId : 1

        await contractInstance.createToken('용기', {from: accounts[1]}); //tokenId : 2

        await contractInstance.createToken('투쟁', {from: accounts[2]}); //tokenId : 3
        await contractInstance.createToken('우유', {from: accounts[2]}); //tokenId : 4

        await tokenSalesInstance.setForSale(1,1, {from: accounts[0]});
        await tokenSalesInstance.setForSale(2,1, {from: accounts[1]});

        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[0]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[1]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[2]})
        await contractInstance.setApprovalForAll(tokenSalesInstance.address, true, {from: accounts[3]})
    });

    describe("RePurchaseToken Test", () => {
        it('Same ID Token RePurchase Test - TokenOnSale', async () => {
            await tokenSalesInstance.purchaseToken(1,{from: accounts[2], value:1*10**18 });
            newTokenOwner = await contractInstance.ownerOf(1);
            assert.equal(newTokenOwner, accounts[2], 'purchase 1phrase Error')

            await tokenSalesInstance.setForSale(1,1, {from: accounts[2]});
            await tokenSalesInstance.purchaseToken(1,{from: accounts[0], value:1*10**18 });

            newTokenOwner = await contractInstance.ownerOf(1);
            assert.equal(newTokenOwner, accounts[0], 'purchase 2phrase Error')
        });

        it('Other ID Token RePurchase Test - TokenOnSale', async () => {
            await tokenSalesInstance.purchaseToken(1,{from: accounts[2], value:1*10**18 });
            newTokenOwner = await contractInstance.ownerOf(1);
            assert.equal(newTokenOwner, accounts[2], 'purchase 1phrase Error')
            await tokenSalesInstance.purchaseToken(2,{from: accounts[0], value:1*10**18 });
            newTokenOwner = await contractInstance.ownerOf(2);
            assert.equal(newTokenOwner, accounts[0], 'purchase 2phrase Error')
        });

        it('Other User Purchase Test - TokenOnSale', async () => {
            await tokenSalesInstance.purchaseToken(1,{from: accounts[2], value:1*10**18 });
            newTokenOwner = await contractInstance.ownerOf(1);
            assert.equal(newTokenOwner, accounts[2], 'purchase 1phrase Error')

            await tokenSalesInstance.setForSale(1,1, {from: accounts[2]});

            await tokenSalesInstance.purchaseToken(1,{from: accounts[3], value:1*10**18 });
            newTokenOwner = await contractInstance.ownerOf(1);
            assert.equal(newTokenOwner, accounts[3], 'purchase 1phrase Error')
        });
    });
});
