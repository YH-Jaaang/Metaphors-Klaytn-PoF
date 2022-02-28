const router = require('express').Router();
const novelController = require("../controller/novelController");


/*** 소설 목록 반환 요청  ***/
router.get("/list", novelController.novelList);

/*** 소설 상세 정보 반환 요청  ***/
router.post("/detail", novelController.novelDetail);

/*** 에피소드 새로 시작 요청 ***/
router.post("/new", novelController.newNovel)

/*** 모든 페이지 반환 요청 ***/
router.post("/page", novelController.currentNovelPage);

/*** 아이템 반환 요청 ***/
router.post("/item", novelController.currentUseItem);

/*** 아이템 사용 ***/
router.post("/nextEpisode/useItem", novelController.useItem);

/*** 아이템 1회 이용 요청 ***/
router.post("/nextEpisode/useCookie", novelController.useCookie);

/*** 아이템 사용 후 현재 에피소드 변경 요청 ***/
// router.post("/nextEpisode", novelController.nextEpisode);

/*** 소설 보는 도중에 왼쪽 상단의 뒤로 돌아가기 버튼 클릭 시 ***/
router.post("/returnMain", novelController.returnMain);
module.exports = router;
