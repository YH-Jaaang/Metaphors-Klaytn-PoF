pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MetaphorsTokenInfo {

    modifier onlyOwner() {
        require(msg.sender == owner, "msg.sender must be same with owner");
        _;
    }

    // uint8 : 0~255
    // uint16 : 0~65535
    struct TokenInfo {
        string name;
        uint16 totalCount;
        uint8 percentage;
        uint8 maxDurability;
        bool isFreeToken;
    }

    address internal owner;

    mapping(string => TokenInfo) private tokenInfos;
    string[] private tokenNames;

    constructor() public {
        owner = msg.sender;
    }

    function createTokenInfo(
        string memory _name,
        uint16 _totalCount,
        uint8 _percentage,
        uint8 _maxDurability,
        bool _isFreeToken
    ) public onlyOwner {
        require(
            bytes(_name).length != 0 &&
            _totalCount != 0 &&
            _percentage != 0 &&
            _percentage <= 100 &&
            _maxDurability != 0 &&
            bytes(tokenInfos[_name].name).length == 0
        );

        tokenInfos[_name] = TokenInfo(
            _name,
            _totalCount,
            _percentage,
            _maxDurability,
            _isFreeToken
        );
        tokenNames.push(_name);

        emit CreateTokenInfo(_name, _totalCount, _percentage, _maxDurability, _isFreeToken);
    }

    function getTokenInfo(
        string memory _name
    ) public view returns (
        string memory,
        uint16,
        uint8,
        uint8,
        bool
    ) {
        return (
        tokenInfos[_name].name,
        tokenInfos[_name].totalCount,
        tokenInfos[_name].percentage,
        tokenInfos[_name].maxDurability,
        tokenInfos[_name].isFreeToken
        );
    }

    function getAllTokenInfoNames() public view returns (
        string[] memory
    ) {
        return tokenNames;
    }

    function editTokenInfo(
        string memory _name,
        uint16 _totalCount,
        uint8 _percentage
    ) public onlyOwner {
        require(
            bytes(_name).length != 0 &&
            _totalCount != 0 &&
            _percentage != 0 &&
            _percentage <= 100
        );

        tokenInfos[_name].totalCount = _totalCount;
        tokenInfos[_name].percentage = _percentage;

        emit EditTokenInfo(_name, _totalCount, _percentage);
    }

    function isFreeToken(
        string memory _name
    ) internal view returns (
        bool
    ) {
        return (
        tokenInfos[_name].isFreeToken
        );
    }


    event CreateTokenInfo(string name, uint16 totalCount, uint8 percentage, uint8 maxDurability, bool isFreeToken);
    event EditTokenInfo(string name, uint16 totalCount, uint8 percentage);
}
