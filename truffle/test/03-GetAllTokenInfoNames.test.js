const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');


contract("MetaphorsTokenInfo-GetAllTokenInfoNames-test", (accounts) => {


    let contractInstance;
    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    beforeEach(async () => {

        contractInstance = await MetaphorsToken.new()
        await contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('투쟁', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('우유', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});


    });

    describe("GetAllTokenInfoNames Test", () => {

        it('allTokenInfoName Test', async() => {

            allTokenInfoName = await contractInstance.getAllTokenInfoNames();
            assert.deepEqual(allTokenInfoName, ['용기','투쟁', '우유'], 'getAllTokenInfoName Error');

        });

    })


});



