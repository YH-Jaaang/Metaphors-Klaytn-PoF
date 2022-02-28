const novelService= require("../service/novelService");
const {authJwt} = require("../middleware");

/*** 소설 목록 반환 요청 ***/
exports.novelList = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));

        const response = await novelService.novelList(userId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }

};
/*** 소설 상세 정보 반환 요청  ***/
exports.novelDetail = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const novelId = req.body.novelId;
        if (novelId == undefined || novelId == "")  {
            throw Error("Wrong Parameters");
        }

        const response = await novelService.novelDetail(userId, novelId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }

};
/*** 에피소드 새로 시작 요청 ***/
exports.newNovel = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const novelId = req.body.novelId;
        if (novelId == undefined || novelId == "")  {
            throw Error("Wrong Parameters");
        }

        const response = await novelService.newNovel(userId, novelId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 모든 페이지 반환 요청 ***/
exports.currentNovelPage = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const novelId = req.body.novelId;
        if (novelId == undefined || novelId == "")  {
            throw Error("Wrong Parameters");
        }

        const response = await novelService.currentNovelPage(userId, novelId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 아이템 반환 요청 ***/
exports.currentUseItem = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const novelId = req.body.novelId;
        if (novelId == undefined || novelId == "")  {
            throw Error("Wrong Parameters");
        }

        const response = await novelService.currentUseItem(userId, novelId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 아이템사용 ***/
exports.useItem = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const name = req.body.name;
        const novelId = req.body.novelId;
        const nextEpisodeId = req.body.next;

        if ((name == undefined || name == "") || (novelId == undefined || novelId == "") || (nextEpisodeId == undefined || nextEpisodeId == "")) {
            throw Error("Wrong Parameters");
        }
        const response = await novelService.useItem(userId, name, nextEpisodeId, novelId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
/*** 아이템 1회 사용 요청 ***/
exports.useCookie = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const novelId = req.body.novelId;
        const nextEpisodeId = req.body.next;
        if ((novelId == undefined || novelId == "") || (nextEpisodeId == undefined || nextEpisodeId == "")) {
            throw Error("Wrong Parameters");
        }
        const response = await novelService.useCookie(userId, nextEpisodeId, novelId);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};
// /*** 아이템 사용 후 현재 에피소드 변경 요청 (아이템사용으로 변경) ***/
// exports.nextEpisode = async (req, res) => {
//     try {
//         const userId = authJwt.accessToken(req.header('x-access-token'));
//         const currentEpisode = req.body.episode;
//         const nextEpisode= req.body.nextEpisode;
//         if ((currentEpisode == undefined || currentEpisode == "") || (nextEpisode == undefined || nextEpisode == "")) {
//             throw Error("Wrong Parameters");
//         }
//         const response = await novelService.nextEpisode(userId, currentEpisode,nextEpisode);
//         res.status(200).json(response);
//     } catch (err) {
//         res.status(200).json({result: 'false', message: err.message});
//     }
// };
/*** 소설 보는 도중에 왼쪽 상단의 뒤로 돌아가기 버튼 클릭 시 ***/
exports.returnMain = async (req, res) => {
    try {
        const userId = authJwt.accessToken(req.header('x-access-token'));
        const episode = req.body.episode;
        const number= req.body.number;
        if ((episode == undefined || episode == "") || (number == undefined || number == "")) {
            throw Error("Wrong Parameters");
        }
        const response = await novelService.returnMain(userId, episode, number);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({result: 'false', message: err.message});
    }
};