const db = require("../models");
const {novel: Novel, user: User, userNovelStatus: UserNovelStatus, episode: Episode, page: Page} = db;
const Op = db.Sequelize.Op;
const {getAllMyItems, useTokenNotOnSale} = require("./txService");

/*** 소설 목록 반환 요청 Service ***/
exports.novelList = async (userId) => {
    let response;
    let processing;
    let recommand;
    let total;

    try {
        /** 진행 중인 소설 목록 (userNovelStatus.novelId == novel.id) **/
        await UserNovelStatus.findOne({
            attributes: ['novelId'],
            where: {
                userId: userId
            }
        }).then(userNovelStatus => {
            return Novel.findAll({
                attributes: ['id', 'name', 'author', 'imagePath', 'nftItems', 'genre'],
                where: {
                    [Op.or]: [{id: userNovelStatus.novelId}]
                }
            });
        }).then(novel => {
            processing = novel;
        }).catch(() => {
            processing = [];
        })


        /** 추천 소설 목록 (user.genre == novel.genre)**/
        await User.findOne({
            attributes: ['genre1', 'genre2', 'genre3'],
            where: {
                id: userId
            }
        }).then(user => {
            const userGenre = [user.genre1, user.genre2, user.genre3];
            return Novel.findAll({
                attributes: ['id', 'name', 'author', 'imagePath', 'nftItems', 'genre'],
                where: {
                    [Op.or]: [{genre: userGenre}]
                }
            })
        }).then(novel => {
            recommand = novel;
        }).catch(() => {
            recommand = [];
        });

        /** 전체 소설 목록 **/
        await Novel.findAll({
            attributes: ['id', 'name', 'author', 'imagePath', 'nftItems', 'genre'],
        }).then(novel => {
            total = novel;
        }).catch(() => {
            total = [];
        });

        const content = {
            processing: processing,
            recommand: recommand,
            total: total
        };
        response = {result: 'ok', content: content};
    } catch (err) {
        throw Error(err.message);
    }
    return response;
};
/*** 소설 상세 정보 반환 요청 Service ***/
exports.novelDetail = async (userId, novelId) => {
    let current;

    const novel = await Novel.findOne({
        where: {id: novelId}
    })

    const userNovelStatus = await UserNovelStatus.findOne({
        attributes: ['current'],
        where: {
            [Op.and]: [{userId: userId}, {novelId: novelId}]
        }
    })
    if (userNovelStatus) {
        current = userNovelStatus.current;
    } else {
        current = '1';
    }

    const content = {
        novelId: novel.id,
        name: novel.name,
        author: novel.author,
        imagePath: novel.imagePath,
        issueDate: novel.issueDate,
        description: novel.description,
        nftItems: novel.nftItems,
        genre: novel.genre,
        current: current
    };
    const response = {result: 'ok', content: content};

    return response;
};
/*** 에피소드 새로 시작 요청 Service ***/
exports.newNovel = async (userId, novelId) => {

    const episode = await Episode.findOne({
        attributes: ['id'],
        where: {
            [Op.and]: [{novelId: novelId}, {number: '1'}]
        }
    });
    const userNovelStatus = await UserNovelStatus.findOne({
        attributes: ['id'],
        where: {
            [Op.and]: [{userId: userId}, {novelId: novelId}]
        }
    });

    if (userNovelStatus) {
        await UserNovelStatus.update({
                episode: episode.id,
                currentPage: '1',
                current: '1'
            },
            {
                where: {
                    [Op.and]: [{userId: userId}, {novelId: novelId}]
                }
            })
    } else {
        await UserNovelStatus.create({
            userId: userId,
            novelId: novelId,
            episode: episode.id,
            currentPage: '1',
            current: '1'
        })
    }

    const response = {result: 'ok', message: 'Successful request for a new episode.'};

    return response;
};
/*** 모든 페이지 반환 요청 Service***/
exports.currentNovelPage = async (userId, novelId) => {
    let returnPage = [];
    let returnChoice = [];
    let returnItem = [];
    let response;

    const prevUserNovelStatus = await UserNovelStatus.findOne({
        where: {
            [Op.and]: [{userId: userId}, {novelId: novelId}]
        }
    });

    if (!prevUserNovelStatus) {

        const preEpisode = await Episode.findOne({
            attributes: ['id'],
            where: {
                [Op.and]: [{novelId: novelId}, {number: "1"}]
            }
        });

        await UserNovelStatus.create({
            userId: userId,
            novelId: novelId,
            episode: preEpisode.id,
            currentPage: '1',
            current: '1'
        })
    }

    const userNovelStatus = await UserNovelStatus.findOne({
        include: [{
            model: User,
            attributes: ['id', 'address'],
        }],
        where: {
            [Op.and]: [{userId: userId}, {novelId: novelId}]
        }
    });

    const page = await Page.findAll({
        where: {
            [Op.and]: [{episodeId: userNovelStatus.episode},]
        }
    });

    await Promise.all(page.map(async (value, i) => {
        returnPage[i] = {
            number: page[i].number, content: page[i].content, hasChoice: page[i].hasChoice, context: page[i].choice
        };
    }))
    const episode = await Episode.findAll({
        where: {
            prevEpisode: page[0].episodeId
        },
    });

    await Promise.all(episode.map((value, i) => {
        returnChoice[i] = {
            episodeId: episode[i].id,
            item: episode[i].prevItem,
            context: episode[i].prevChoice
        };
    }));

    //내 아이템 보기 이후 해당 에피소드 아이템 추출
    const result = await getAllMyItems(userNovelStatus.user.address);

    for (let i = 0; i < episode.length; i++) {
        let tmp = false;
        for (let j = 0; j < result.length; j++) {
            if (episode[i].prevItem === result[j].name) {
                returnItem.push(result[j]);
                tmp = true;
            }
        }
        if (tmp === false) {
            const nonItem = {
                id: '',
                name: episode[i].prevItem,
                imagePath: '',
                durability: '',
                maxDurability: '',
                isFreeToken: '',
                price: ''
            }
            returnItem.push(nonItem);
        }
    }

    const novel = await Novel.findOne({
        attributes: ['id', 'name', 'author'],
        where: {
            id: novelId
        },
    });

    const content = {
        novelId: userNovelStatus.novelId,
        name: novel.name,
        author: novel.author,
        episodeId: userNovelStatus.episode,
        current: userNovelStatus.current,
        pages: returnPage,
        choice: returnChoice,
        items: returnItem
    }

    response = {result: 'ok', content: content};

    return response;
};
/*** 아이템 반환 요청 Service***/
exports.currentUseItem = async (userId, novelId) => {
    let returnChoice = [];
    let returnItem = [];

    const userNovelStatus = await UserNovelStatus.findOne({
        include: [{
            model: User,
            attributes: ['id', 'address'],
        }],
        where: {
            [Op.and]: [{userId: userId}, {novelId: novelId}]
        }
    });

    const episode = await Episode.findAll({
        include: [{
            model: Novel,
            attributes: ['id', 'name', 'author'],
        }],
        where: {
            prevEpisode: userNovelStatus.episode
        },
    });

    await Promise.all(episode.map((value, i) => {
        returnChoice[i] = {
            episodeId: episode[i].id,
            item: episode[i].prevItem,
            context: episode[i].prevChoice
        };
    }));

    //내 아이템 보기 이후 해당 에피소드 아이템 추출
    const result = await getAllMyItems(userNovelStatus.user.address);

    for (let i = 0; i < episode.length; i++) {
        let tmp = false;
        for (let j = 0; j < result.length; j++) {
            if (episode[i].prevItem === result[j].name) {
                returnItem.push(result[j]);
                tmp = true;
            }
        }
        if (tmp === false) {
            const nonItem = {
                id: '',
                name: episode[i].prevItem,
                imagePath: '',
                durability: '',
                maxDurability: '',
                isFreeToken: '',
                price: ''
            }
            returnItem.push(nonItem);
        }
    }

    const content = {
        novelId: userNovelStatus.novelId,
        name: episode[0].novel.name,
        author: episode[0].novel.author,
        episodeId: userNovelStatus.episode,
        current: userNovelStatus.current,
        choice: returnChoice,
        items: returnItem
    }
    const response = {result: 'ok', content: content};

    return response;
};
/*** 아이템사용 Service ***/
exports.useItem = async (userId, name, nextEpisodeId, novelId) => {

    const user = await User.findOne({
        attributes: ['privateKey', 'address'],
        where: {
            id: userId
        }
    })
    const useTokenOnsale = await useTokenNotOnSale(user.privateKey, user.address, name);

    if(useTokenOnsale.result == "fail")
        throw Error(useTokenOnsale.message);

    const page = await Page.findOne({
        where: {
            episodeId: nextEpisodeId
        },
        order: [
            ['id', 'DESC'],
        ],
    });
    await UserNovelStatus.update({
            episode: nextEpisodeId,
            currentPage: page.id,
            current: db.sequelize.literal('current+1')
        },
        {
            where: {
                [Op.and]: [{userId: userId}, {novelId: novelId}]
            }
        });

    const response = {result: 'ok', message: 'Successful request for a next episode.'};

    return response;
};
/*** 아이템 1회 사용(쿠키) 요청 Service ***/
exports.useCookie = async (userId, nextEpisodeId, novelId) => {
    const user = await User.findOne({
        attributes: ['cookie'],
        where: {
            id: userId
        }
    });

    if (user.cookie < 1) {
        throw Error('You don`t have enough cookie.');
    }

    const page = await Page.findOne({
        where: {
            episodeId: nextEpisodeId
        },
        order: [
            ['id', 'DESC'],
        ],
    });
    await UserNovelStatus.update({
            episode: nextEpisodeId,
            currentPage: page.id,
            current: db.sequelize.literal('current+1')
        },
        {
            where: {
                [Op.and]: [{userId: userId}, {novelId: novelId}]
            }
        });
    //쿠키 차감
    const userCookie = await User.update({
            cookie: db.sequelize.literal('cookie-1')
        }, {
            where: {
                id: userId
            }
        }
    );

    const response = {
        result: 'ok',
        message: 'Successful request for a next episode.',
        balanceOfCookie: userCookie.cookie
    };

    return response;

};

/*** 소설 보는 도중에 왼쪽 상단의 뒤로 돌아가기 버튼 클릭 시  Service ***/
exports.returnMain = async (userId, episodeId, number) => {

    const page = await Page.findOne({
        include: [{
            model: Episode,
            attributes: ['novelId'],
        }],
        where: {
            [Op.and]: [{episodeId: episodeId}, {number: number}]
        },
    });

    await UserNovelStatus.update({
            currentPage: page.id,
            episode: page.episodeId
        },
        {
            where: {
                [Op.and]: [{userId: userId}, {novelId: page.episode.novelId}]
            }
        }
    )

    const response = {result: 'ok', message: 'Successfully saved the user novel information.'};

    return response;
};