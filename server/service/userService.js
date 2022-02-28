const {transaction, file} = require("../middleware");
const db = require("../models");
const {file: File, user: User, genre: Genre, personality: Personality} = db;

/*** file 처리 Service ***/
exports.fileUpload = async (userId, uploadFile) => {
    let response;

    await file.Upload(userId, uploadFile).then(async (relativePath) => {
        //db
        await File.create({
            userId: userId, file_path: relativePath,
        })
        response = {
            result: 'ok', content: {
                name: uploadFile.name, mimetype: uploadFile.mimetype, size: uploadFile.size
            }, message: 'File is uploaded'
        };
    }).catch(() => {
        throw Error('Failed to save files to database.');
    })

    return response;

}

/*** 사용자 정보 요청 Service ***/
exports.userInfo = async (userId) => {
    let response;
    const user = await User.findOne({
        attributes: ['email', 'nickname', 'cookie', 'address'], where: {
            id: userId
        }
    })
    if (!user.nickname) user.nickname = '';

    const getBalance = await transaction.getBalance(user.address);

    const content = {
        email: user.email,
        nickname: user.nickname,
        cookie: user.cookie,
        token: getBalance
    };

    response = {result: 'ok', content: content};


    return response;
};

/*** 장르 목록 요청 Service ***/
exports.genre = async () => {
    const genreArr = await Genre.findAll({attributes: ['genre'],});
    const response = {result: 'ok', content: genreArr};

    return response;
};

/*** 성격 목록 요청 Service ***/
exports.personality = async () => {
    const personalityArr = await Personality.findAll({attributes: ['personality'],});
    const response = {result: 'ok', content: personalityArr};

    return response;
};