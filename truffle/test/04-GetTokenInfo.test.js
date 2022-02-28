const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');


contract("MetaphorsTokenInfo-GetTokenInfo-test", (accounts) => {


    let contractInstance;
    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    beforeEach(async () => {

        contractInstance = await MetaphorsToken.new()
        await contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});


    });
    describe("GetTokenInfo Test", () => {

        it('getTokenInfo[_name].name Test', async () => {

            getTokenInfo = await contractInstance.getTokenInfo('용기');
            assert.deepEqual(getTokenInfo[0], '용기', 'tokenInfos[_name].name is Error');

        });

        it('getTokenInfo[_name].totalCount Test', async () => {

            getTokenInfo = await contractInstance.getTokenInfo('용기');
            assert.equal(getTokenInfo[1], 500, 'tokenInfos[_name].totalCount is Error');

        });

        it('getTokenInfo[_name].percentage Test', async () => {

            getTokenInfo = await contractInstance.getTokenInfo('용기');
            assert.equal(getTokenInfo[2], 100, 'tokenInfos[_name].percentage is Error');

        });

        it('getTokenInfo[_name].maxDurability Test', async () => {

            getTokenInfo = await contractInstance.getTokenInfo('용기');
            assert.equal(getTokenInfo[3], 1, 'tokenInfos[_name].maxDurability is Error');

        });

        it('getTokenInfo[_name].isFreeToken Test', async () => {

            getTokenInfo = await contractInstance.getTokenInfo('용기');
            assert.equal(getTokenInfo[4], false, 'tokenInfos[_name].isFreeToken is Error');

        });

    })


});



