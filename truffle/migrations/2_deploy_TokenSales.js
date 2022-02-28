
const MetaphorsToken = artifacts.require('./Metaphors/MetaphorsToken.sol')
const TokenSales = artifacts.require('./Metaphors/TokenSales.sol')
const fs = require('fs')

module.exports = function (deployer) {
    deployer.deploy(TokenSales, MetaphorsToken.address)
        .then(() => {
            fs.writeFile(
                './truffle/address/TokenSales',
                TokenSales.address,
                (err) => {
                    if (err) throw err
                    console.log("파일에 주소 입력 성공");
                })
        });
}
