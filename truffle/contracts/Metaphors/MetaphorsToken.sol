pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./MetaphorsTokenInfo.sol";
import "../Util/Utils.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract MetaphorsToken is Utils, MetaphorsTokenInfo, ERC721Full {
    struct Token {
        uint256 id;
        string name;
        uint8 durability;
        string imageURI;
    }

    uint256 private lastTokenId;

    mapping(uint256 => Token) tokens;

    mapping(address => mapping(string => uint256)) ownedTokenIds;
    mapping(address => string[]) ownedTokenList;
    mapping(address => mapping(string => uint256)) ownedTokenListIndex;

    mapping(string => uint16) tokenCounts;

    constructor() ERC721Full("MetaphorsToken", "MPT") public {
        lastTokenId = 0;
    }

    function transferToOwner(
        string memory _name
    ) public payable {
        require(bytes(_name).length != 0, "_name must not be blank");
        require(ownedTokenIds[msg.sender][_name] == 0, "user has this token");

        string memory name;
        uint16 totalCount;
        uint8 percentage;
        uint8 maxDurability;
        bool isFreeToken;

        (name, totalCount, percentage, maxDurability, isFreeToken) = getTokenInfo(_name);

        require(msg.value == 1 * 10 ** 18 || isFreeToken, "createToken Fee is 1 KLAY");

        address payable payableOwner = address(uint160(owner));
        payableOwner.transfer(msg.value);
    }

    function createToken(
        string memory _name
    ) public {
        require(bytes(_name).length != 0, "_name must not be blank");
        require(ownedTokenIds[msg.sender][_name] == 0, "user has this token");

        string memory name;
        uint16 totalCount;
        uint8 percentage;
        uint8 maxDurability;
        bool isFreeToken;

        (name, totalCount, percentage, maxDurability, isFreeToken) = getTokenInfo(_name);

        uint nonce = randMod(100);

        require(bytes(name).length != 0, "token info does not exist");
        require(tokenCounts[_name] < totalCount || isFreeToken, "tokenCount must be lower than totalCount or be free token");
        require(nonce <= percentage || isFreeToken, "nonce is bigger than percentage and it is not free token");

        lastTokenId++;

        Token memory token = Token(
            lastTokenId,
            _name,
            maxDurability,
            ""
        );

        ownedTokenIds[msg.sender][_name] = lastTokenId;
        tokens[lastTokenId] = token;

        ownedTokenList[msg.sender].push(_name);
        uint256 index = ownedTokenList[msg.sender].length;
        ownedTokenListIndex[msg.sender][_name] = index;

        tokenCounts[_name]++;

        _mint(msg.sender, lastTokenId);

        emit CreateToken(msg.sender, lastTokenId, _name, nonce);
    }

    function useToken(
        string memory _name
    ) public {
        uint256 id = ownedTokenIds[msg.sender][_name];

        require(tokens[id].id != 0, "token does not exist");

        if (!isFreeToken(_name)) {
            tokens[id].durability--;
        }

        if (tokens[id].durability == 0) {
            _burn(id);

            tokens[id] = Token(0, "", 0, "");
            ownedTokenIds[msg.sender][_name] = 0;

            tokenCounts[_name]--;

            removeElementInArray(msg.sender, _name);
        }

        emit UseToken(msg.sender, _name, tokens[id].durability);
    }

    function editTokenImage(
        string memory _name,
        string memory _imageURI
    ) public {
        require(bytes(_name).length != 0, "_name must not be blank");
        require(bytes(_imageURI).length != 0, "_imageURI must not be blank");
        require(ownedTokenIds[msg.sender][_name] != 0, "token does not exist");

        uint256 id = ownedTokenIds[msg.sender][_name];

        tokens[id].imageURI = _imageURI;
    }

    function getAllTokenNamesOfUser(address _user) public view returns (
        string[] memory
    ) {
        return ownedTokenList[_user];
    }

    function getTokenCount(
        string memory _name
    ) public view returns (
        uint16
    ) {
        return tokenCounts[_name];
    }

    function removeElementInArray(
        address _user,
        string memory _name
    ) private {
        uint256 lastIndex = ownedTokenList[_user].length - 1;
        uint256 index = ownedTokenListIndex[_user][_name];

        if(index != ownedTokenList[_user].length) {
            string memory lastElement = ownedTokenList[_user][lastIndex];
            ownedTokenList[_user][index-1] = lastElement;
            ownedTokenListIndex[_user][lastElement] = index;
        }

        delete ownedTokenList[_user][lastIndex];
        ownedTokenList[_user].length--;
        ownedTokenListIndex[_user][_name] = 0;
    }

    function removeTokenInList(
        uint256 _id,
        address _from,
        address _to
    ) external {
        string memory name = tokens[_id].name;

        ownedTokenIds[_to][name] = ownedTokenIds[_from][name];
        ownedTokenIds[_from][name] = 0;

        removeElementInArray(_from, name);
        ownedTokenList[_to].push(name);
        ownedTokenListIndex[_to][name] = ownedTokenList[_to].length;
    }

    function getToken(
        uint256 _id
    ) external view returns (
        string memory,
        uint8,
        string memory
    ) {
        return (
        tokens[_id].name,
        tokens[_id].durability,
        tokens[_id].imageURI
        );
    }

    function getTokenId(
        address _user,
        string memory _name
    ) public view returns (
        uint256
    ) {
        return ownedTokenIds[_user][_name];
    }

    event CreateToken(address sender, uint256 id, string name, uint nonce);
    event UseToken(address sender, string name, uint8 durability);
}
