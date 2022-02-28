const Assert = require("truffle-assertions");
const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');


contract("MetaphorsToken-EditTokenImage-test", (accounts) => {


    let contractInstance;
    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    beforeEach(async () => {

        contractInstance = await MetaphorsToken.new()
        await contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.createTokenInfo('투쟁', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
        await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18});
        await contractInstance.createToken('용기', {from: accounts[1]});

    });

    describe("EditTokenImage Test", () => {
        it('EditTokenImage Test', async () => {


            id = await contractInstance.getTokenId(accounts[1], '용기');

            beforeTokenInfo = await contractInstance.getToken(id);



            await contractInstance.editTokenImage('용기', 'https://ipfs.io', {from: accounts[1]});
            afterTokenInfo = await contractInstance.getToken(id);
            afterTokenImage = afterTokenInfo[2]

            assert.deepEqual(afterTokenImage, 'https://ipfs.io', 'EditTokenImage is Error')



        });

    });
    describe("EditTokenImage revert Test", () => {

        it('Should be reverted if name is blank', async () => {

            await Assert.reverts(
                contractInstance.editTokenImage('', 'https://ipfs.io', {from: accounts[1]}),
                '_name must not be blank'
            );
        });

        it('Should be reverted if imageURI is blank', async () => {

            await Assert.reverts(
                contractInstance.editTokenImage('용기', '', {from: accounts[1]}),
                '_imageURI must not be blank'
            );
        });

        it('Should be reverted if token does not exist', async () => {

            await Assert.reverts(
                contractInstance.editTokenImage('우유', 'https://ipfs.io', {from: accounts[1]}),
                'token does not exist'
            );
        });
    });
});



