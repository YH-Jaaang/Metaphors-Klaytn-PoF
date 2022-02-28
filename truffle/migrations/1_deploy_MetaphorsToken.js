
const MetaphorsToken = artifacts.require('./Metaphors/MetaphorsToken.sol')
const fs = require('fs')

module.exports = function (deployer) {
    deployer.deploy(MetaphorsToken)
        .then((accounts) => {
            fs.writeFile(
                './truffle/address/MetaphorsToken',
                MetaphorsToken.address,
                (err) => {
                    if (err) throw err
                    console.log("파일에 주소 입력 성공");
                })
        })
}
