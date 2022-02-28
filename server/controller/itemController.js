const itemService= require("../service/itemService");
const {authJwt} = require("../middleware");

/*** NFT 아이템 생산 요청 (블록체인) ***/
exports.createItem = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const name = req.body.name;

        if (name == undefined || name == "") {
            throw Error("Wrong Parameters");
        }

        const response = await itemService.createItem(userId, name, 1);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** NFT 아이템 생산 이후 이미지 저장 요청 (IPFS) ***/
exports.imgCreate=  async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const name = req.body.name;
        const imgURI = req.body.files;
        // let uploadFile = req.files.files;
        //const file = req.body.files;

        // const uploadFile = File([file], name);

        if ((imgURI == undefined || imgURI == "") || (name == undefined || name == "")){
            throw Error("Wrong Parameters");
        }

        const response = await itemService.imgCreate(userId, name, imgURI);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
}
/*** NFT 아이템 목록 반환 요청(블록체인) ***/
exports.itemInfo = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const response = await itemService.itemInfo(userId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }

};
