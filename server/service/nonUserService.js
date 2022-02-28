const db = require("../models");
const {novel: Novel} = db;

/*** 소설 목록 반환 요청 (비회원) Service ***/
exports.novelList = async () => {
    const novel = await Novel.findAll({attributes: ['id', 'name', 'author', 'imagePath', 'nftItems', 'genre']})

    // for (let i = 0; i < novel.length; i++) {
    //     // const blob = new Blob(['../../img'], { type: "text/xml"});
    //     content = {
    //         id: novel[i].id,
    //         name: novel[i].name,
    //         author: novel[i].author,
    //         imagePath: novel[i].imagePath,
    //         nftItems: novel[i].nftItems,
    //         genre: novel[i].genre
    //     };
    // }
    const content = {
        total: novel
    };
    const response = {result: 'ok', content: content};


    return response;
};