const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');
const Assert = require('truffle-assertions');

contract("MetaphorsToken-CreateToken-test", (accounts) => {


    let contractInstance;

    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    beforeEach(async () => {

        contractInstance = await MetaphorsToken.new()
        await contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('투쟁', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});

    });

    describe("CreateToken Test", () => {
        it('CreateToken Test', async () => {
            await contractInstance.transferToOwner('용기', {from: accounts[0], value: 1*10**18});
            await contractInstance.createToken('용기', {from: accounts[0]});
            await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18});
            await contractInstance.createToken('용기', {from: accounts[1]});
            getTokenCount = await contractInstance.getTokenCount('용기');

            assert.equal(getTokenCount, '2');


        });
    });

    describe("CreateToken revert Test", () => {
        it('Should be reverted if name is blank', async () => {
            await contractInstance.transferToOwner('용기', {from: accounts[0], value: 1*10**18});
            await Assert.reverts(
                contractInstance.createToken('', {from: accounts[0]}),
                '_name must not be blank'
            );
        });

        it('Should be reverted if user has this token', async () => {
            await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18})
            await contractInstance.createToken('용기', {from: accounts[1]});

            await Assert.reverts(
                contractInstance.createToken('용기', {from: accounts[1]}),
                'user has this token'
            );
        });

        it('Should be reverted if token info does not exist', async () => {
            await contractInstance.transferToOwner('우유', {from: accounts[0], value: 1*10**18});

            await Assert.reverts(
                contractInstance.createToken('우유', {from: accounts[0]}),
                'token info does not exist'
            );
        });

        it('Should be reverted if tokenCount is bigger than totalCount', async () => {
            const _totalCount = 1;
            const _percentage = 100;
            const _maxDurability = 1;
            const _isFreeToken = false;
            await contractInstance.createTokenInfo('우유', _totalCount, _percentage, _maxDurability, _isFreeToken, {from: accounts[0]});
            await contractInstance.transferToOwner('우유', {from: accounts[1], value: 1*10**18})
            await contractInstance.createToken('우유', {from: accounts[1]})

            await Assert.reverts(
                contractInstance.createToken('우유', {from: accounts[2]}),
                'tokenCount must be lower than totalCount or be free token'
            );
        });

    });

});



