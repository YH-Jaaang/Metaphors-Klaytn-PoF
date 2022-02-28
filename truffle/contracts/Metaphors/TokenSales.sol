pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;
import "./MetaphorsToken.sol";

contract TokenSales {
    MetaphorsToken public nftAddress;

    mapping(uint256 => uint256) public tokenPrice;

    uint256[] tokensOnSale;
    mapping(uint256 => uint256) tokenOnSaleIndex;

    constructor(
        address _tokenAddress
    ) public {
        nftAddress = MetaphorsToken(_tokenAddress);
    }

    function setForSale(
        uint256 _tokenId,
        uint256 _price
    ) public {
        require(_tokenId > 0, "_tokenId must be bigger than 0");
        require(_price > 0, "_price must be bigger than 0");
        require(nftAddress.ownerOf(_tokenId) == msg.sender, "ownerOf(_tokenId) must be same with msg.sender");
        require(tokenPrice[_tokenId] == 0, "tokenPrice[_tokenId] must be 0");
        (string memory name, uint8 durability, string memory imageURI)  = nftAddress.getToken(_tokenId);
        (string memory _name, uint16 totalCount, uint8 percentage, uint8 maxDurability, bool isFreeToken) = nftAddress.getTokenInfo(name);
        require(isFreeToken == false, "it is free token");

        tokenPrice[_tokenId] = _price;

        tokensOnSale.push(_tokenId);
        uint256 index = tokensOnSale.length;
        tokenOnSaleIndex[_tokenId] = index;

        emit SetForSale(_tokenId, _price);
    }

    function purchaseToken(
        uint256 _tokenId
    ) public payable {
        require(_tokenId > 0, "_tokenId must be bigger than 0");
        require(msg.value == (tokenPrice[_tokenId] * 10 ** 18 ), "msg.value must be same with tokenPrice[_tokenId]");
        require(nftAddress.ownerOf(_tokenId) != msg.sender, "ownerOf(_tokenId) must not be same with msg.sender");

        (string memory name, uint8 durability, string memory imageURI)  = nftAddress.getToken(_tokenId);
        uint256 id = nftAddress.getTokenId(msg.sender, name);

        require(id == 0, "msg.sender already has a item named same");

        address tokenSeller = nftAddress.ownerOf(_tokenId);

        address payable payableTokenSeller = address(uint160(nftAddress.ownerOf(_tokenId)));
        payableTokenSeller.transfer(msg.value);

        nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);

        initData(_tokenId);

        (bool success, bytes memory data) = address(nftAddress).call(
            abi.encodeWithSignature("removeTokenInList(uint256,address,address)", _tokenId, tokenSeller, msg.sender)
        );
        require(success, "ownedTokenList in MetaphorsToken removeTokenInList ERROR");

        emit PurchaseToken(msg.sender, msg.value, success, data);
    }

    function removeTokenOnSales(
        uint256 _tokenId
    ) public {
        require(_tokenId > 0, "_tokenId must be bigger than 0");
        require(tokenPrice[_tokenId] != 0, "tokenPrice[_tokenId] must not be 0");
        require(nftAddress.ownerOf(_tokenId) == msg.sender, "ownerOf(_tokenId) must be same with msg.sender");

        initData(_tokenId);

        emit RemoveTokenOnSales(_tokenId);
    }

    function getTokenIdOnSales() public view returns (
        uint256[] memory
    ) {
        return tokensOnSale;
    }


    function getTokenPrice(
        uint256 _tokenId
    ) public view returns (
        uint256
    ) {
        return tokenPrice[_tokenId];
    }

    function initData(uint256 _tokenId) private {
        tokenPrice[_tokenId] = 0;

        uint256 lastIndex = tokensOnSale.length - 1;

        if (tokensOnSale.length != tokenOnSaleIndex[_tokenId]) {
            uint256 index = tokenOnSaleIndex[_tokenId] - 1;

            tokensOnSale[index] = tokensOnSale[lastIndex];

            uint256 element = tokensOnSale[index];
            tokenOnSaleIndex[element] = tokenOnSaleIndex[_tokenId];
        }

        delete tokensOnSale[lastIndex];
        tokensOnSale.length--;
        tokenOnSaleIndex[_tokenId] = 0;
    }

    event SetForSale(uint256 tokenId, uint256 price);
    event PurchaseToken(address sender, uint value, bool success, bytes data);
    event RemoveTokenOnSales(uint256 tokenId);
    event UseTokenNotOnSale(uint256 tokenId);
}
