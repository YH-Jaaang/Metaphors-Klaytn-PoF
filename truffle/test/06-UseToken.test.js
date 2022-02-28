const Assert = require("truffle-assertions");
const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');


contract("MetaphorsToken-UseToken-test", (accounts) => {


    let contractInstance;
    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 3;
    const isFreeToken = false;

    beforeEach(async () => {

        contractInstance = await MetaphorsToken.new()
        await contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('투쟁', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('우유', totalCount, percentage, 1, isFreeToken, {from: accounts[0]});
        await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[1]});
        await contractInstance.transferToOwner('투쟁', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('투쟁', {from: accounts[1]});
        await contractInstance.transferToOwner('용기', {from: accounts[2], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[2]});
        await contractInstance.transferToOwner('용기', {from: accounts[3], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[3]});
        await contractInstance.transferToOwner('우유', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('우유', {from: accounts[1]});

    });

    describe("UseToken Test", () => {
        it('UseToken Test - Count', async () => {


            beforeTokenCount = await contractInstance.getTokenCount('우유');


            await contractInstance.useToken('우유', {from: accounts[1]})
            afterTokenCount = await contractInstance.getTokenCount('우유');

            diff = beforeTokenCount - afterTokenCount;
            assert.equal(diff, 1, 'tokenCounts should be decreased')


        });

        it('UseToken Test - Durability', async () => {

            beforeGetToken = await contractInstance.getToken(1);
            beforeDurability = beforeGetToken[1];
            await contractInstance.useToken('용기', {from: accounts[1]})
            id = await contractInstance.getTokenId(accounts[1], '용기');
            afterGetToken = await contractInstance.getToken(id);
            afterDurability = afterGetToken[1];

            diff = beforeDurability - afterDurability;
            assert.equal(diff, 1, 'Durability of Token should be decreased')

        });


        it('Should be burn if durability of token is 0', async () => {

            id = await contractInstance.getTokenId(accounts[1], '우유');

            await contractInstance.useToken('우유', {from: accounts[1]})
            burningToken = await contractInstance.getToken(id);

            assert.deepEqual(burningToken[0], '', "Name of this token should be removed");
            assert.equal(burningToken[1], 0, "Durability of this token should be 0");
            assert.deepEqual(burningToken[2], '', "ImageURI of this token should be removed");

        });

        it('UseToken Test - getAllTokenNamesOfUser', async () => {

            beforeGetTokenNames = await contractInstance.getAllTokenNamesOfUser(accounts[1]);
            await contractInstance.useToken('우유', {from: accounts[1]})
            afterGetTokenNames = await contractInstance.getAllTokenNamesOfUser(accounts[1]);


            assert.deepEqual(beforeGetTokenNames, ['용기','투쟁','우유'], 'getAllTokenName Error');
            assert.deepEqual(afterGetTokenNames, ['용기','투쟁'], 'getAllTokenName Error');

        });

    });

    describe("UseToken revert Test", () => {

        it('Should be reverted if token does not exist - msg.sender does not exist ', async () => {
            await Assert.reverts(
                contractInstance.useToken('용기', {from: accounts[0]}),
                'token does not exist'
            );

        });

        it('Should be reverted if token does not exist - msg.sender does not have this Token', async () => {
            await Assert.reverts(
                contractInstance.useToken('우유', {from: accounts[2]}),
                'token does not exist'
            );

        });


    })


});



