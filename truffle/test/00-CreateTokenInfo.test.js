const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');
const Assert = require('truffle-assertions');


contract("MetaphorsToken-CreateToken-test", (accounts) => {


    let contractInstance;

    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    before(async () => {
        contractInstance = await MetaphorsToken.new()
    });

    describe("CreateToken - onlyOwner Test", () => {
        it('Should be reverted if msg.sender is not owner', async ()=> {
            await Assert.reverts(
                contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[1]}),
                'msg.sender must be same with owner'
            );

        })
    })


});



