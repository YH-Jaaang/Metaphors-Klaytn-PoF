const transaction = require("../middleware/transaction");
const db = require("../models");
const bcrypt = require("bcryptjs");
const {verifySignIn} = require("../middleware");
const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const axios = require("axios");
const kakaoConfig = require("../config/kakaoConfig");
const {user: User, refreshToken: RefreshToken, personality: Personality} = db;
const {createToken, editTokenImage} = require("./txService");
const Op = db.Sequelize.Op;

/*** 이메일 중복확인 Service ***/
exports.emailCheck = async (userEmail) => {
    await User.findOne({
        where: {
            email: userEmail
        }
    }).then((user) => {
        if (user) {
            throw Error('Failed! Email is already in use.');
        }
    }).catch(err => {
        throw Error(err.message);
    });
};
/*** 회원가입 service ***/
exports.signUp = async (userAccount) => {
    let createUser;
    let response;

    try {
        const wallets = await transaction.wallet();

        if (userAccount.password) {
            createUser = User.create({
                email: userAccount.email,
                password: bcrypt.hashSync(userAccount.password, 8),
                address: wallets.address,
                privateKey: wallets.key.privateKey
            })
        } else {
            createUser = User.create({
                email: userAccount.email, address: wallets.address, privateKey: wallets.key.privateKey
            })
        }
        await createUser.then((user) => {
            const content = {
                email: user.email,
            };
            response = {result: 'ok', content: content, message: "User registered successfully."}
        })
    } catch (err) {
        throw Error(err.message);
    }
    return response;
};
/*** 로그인 Service ***/
exports.signIn = async (userAccount) => {
    let response;
    await User.findOne({
        where: {
            email: userAccount.email
        }
    })
        .then(async (user) => {
            if (!user) {
                throw Error('User Not found.');
            }
            const passwordIsValid = bcrypt.compareSync(userAccount.password, user.password);

            if (!passwordIsValid) {
                throw Error('Invalid Password!');
            }

            response = await verifySignIn.sendSignIn(user);
        })
        .catch(err => {
            throw Error(err.message);
        });
    return response;
};
/*** 닉네임, 성격, 장르 선택하기 Service ***/
exports.signInDetail = async (userAccount, userId) => {

    let result1 = [];
    let result2 = [];

    await User.update({
        nickname: userAccount.nickname,
        genre1: userAccount.genre1,
        genre2: userAccount.genre2,
        genre3: userAccount.genre3
    }, {where: {id: userId}});

    const prevUser = await User.findOne({
        attributes: ['privateKey'],
        where: {
            id: userId
        }
    });
    const personality = await Personality.findAll({
        where: {
            [Op.or]: [{ personality: userAccount.personality1},
                      { personality: userAccount.personality2},
                      { personality: userAccount.personality3}]
        }
    });

    for(let i=0; i<personality.length; i++){
        result1[i] = await createToken(prevUser.privateKey, personality[i].personality);
        result2[i] = await editTokenImage(prevUser.privateKey, personality[i].personality, personality[i].imagePath);
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    const content = {
        email: user.email,
        nickname: user.nickname,
        personality1: userAccount.personality1,
        personality2: userAccount.personality2,
        personality3: userAccount.personality3,
        genre1: user.genre1,
        genre2: user.genre2,
        genre3: user.genre3,
    };

    const response = {result: 'ok', content: content};
    return response;
};
/*** refreshtoken 재발행 Service ***/
exports.refreshToken = async (requestToken) => {
    try {
        let refreshToken = await RefreshToken.findOne({where: {token: requestToken}});

        if (!refreshToken) {
            throw Error('Refresh token is not in database!');
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({where: {id: refreshToken.id}});
            throw Error('Refresh token was expired. Please make a new signin request');
        }

        const user = await refreshToken.getUser();
        const newAccessToken = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        let accessExpired = new Date();
        accessExpired.setSeconds(accessExpired.getSeconds() + config.jwtExpiration);
        // const access_expired = Number(new Date().getTime().toString().substring(0, 10)) + config.jwtExpiration.valueOf();
        const content = {
            accessToken: newAccessToken, refreshToken: refreshToken.token, accessExpiredTime: accessExpired,
        };
        return {result: 'ok', content};

    } catch (err) {
        throw Error(err.message);
    }
};
/*** 로그아웃 Service ***/
exports.logout = async (userId) => {
    let response;

    RefreshToken.destroy({
        where: {userId: userId}
    }).catch(err => {
        throw Error(err.message);
    });
    response = {result: 'ok', message: 'Logout Successful'};

    return response;
};
/*** 카카오 로그인 회원가입 Service ***/
exports.kakaoCallBack = async (code) => {
    const kakao = kakaoConfig;
    try {
        const {data} = await axios({
            method: 'POST', url: `${kakao.authURL}/token`, headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }, params: {
                grant_type: 'authorization_code',//특정 스트링
                client_id: kakao.clientID,
                client_secret: kakao.clientSecret,
                redirectUri: kakao.redirectUri,
                code: code,
            }
        })
        const kakao_access_token = data['access_token'];

        const {data: me} = await axios({
            method: 'GET', url: `https://kapi.kakao.com/v2/user/me`, headers: {
                'authorization': `bearer ${kakao_access_token}`,
            }
        });
        const {kakao_account} = me;

        const user_account = await User.findOne({
            where: {
                email: kakao_account.email
            }
        });

        //snsSignUp
        if (!user_account) {
            await this.signUp(kakao_account);
        }
        //snsSignIn
        return await verifySignIn.sendSignIn(user_account);

    } catch (err) {
        throw Error(err.message);
    }
};
