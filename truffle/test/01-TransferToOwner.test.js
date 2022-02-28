const MetaphorsToken = artifacts.require('../contracts/Metaphors/MetaphorsToken');
const Assert = require('truffle-assertions');


contract("MetaphorsToken-TransferToOwner-test", (accounts) => {


    let contractInstance;

    const totalCount = 500;
    const percentage = 100;
    const maxDurability = 1;
    const isFreeToken = false;

    before(async () => {
        contractInstance = await MetaphorsToken.new()
        contractInstance.createTokenInfo('용기', totalCount, percentage, maxDurability, isFreeToken, {from: accounts[0]});
    });

    describe("TransferToOwner Test", () => {
        it('TransferToOwner Test', async () => {


            beforeBalanceStr = await web3.eth.getBalance(accounts[0]);
            beforeBalance = await web3.utils.fromWei(beforeBalanceStr,'ether');

            await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18});
            afterBalanceStr = await web3.eth.getBalance(accounts[0]);
            afterBalance = await web3.utils.fromWei(afterBalanceStr,'ether');

            diff = afterBalance - beforeBalance;
            assert.equal(diff, 1, 'Balance is not matching');
        });
    });

    describe("TransferToOwner revert Test", () => {
        it('Should be reverted if name is be blank', async ()=> {
            await Assert.reverts(
                contractInstance.transferToOwner('', {from: accounts[1], value: 1*10**18}),
                '_name must not be blank'
            );
        });

        it('Should be reverted if user has this token', async ()=> {
            await contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18});
            await contractInstance.createToken('용기', {from : accounts[1]});
            await Assert.reverts(
                contractInstance.transferToOwner('용기', {from: accounts[1], value: 1*10**18}),
                'user has this token'
            );
        });

        it('Should be reverted if createToken Fee is not 1 KLAY', async ()=> {

            await Assert.reverts(
                contractInstance.transferToOwner('용기', {from: accounts[2], value: 10*10**18}),
                'createToken Fee is 1 KLAY'
            );
        });
    });


});



