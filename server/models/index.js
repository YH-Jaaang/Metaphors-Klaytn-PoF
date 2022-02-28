const config = require("../config/database.js");

const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.refreshToken = require("./RefreshToken.js")(sequelize, Sequelize);
db.userNovelStatus = require("./UserNovelStatus.js")(sequelize, Sequelize);
db.novel = require("./Novel.js")(sequelize, Sequelize);
db.episode = require("./Episode.js")(sequelize, Sequelize);
db.page = require("./Page.js")(sequelize, Sequelize);
db.genre = require("./Genre.js")(sequelize, Sequelize);
db.personality = require("./Personality.js")(sequelize, Sequelize);

// db.itemForSale = require("./ItemForSale.js")(sequelize, Sequelize);
// db.itemForSale = require("./ItemForSale.js")(sequelize, Sequelize);

db.file = require("./File.js")(sequelize, Sequelize);
//
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
//
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// //1:1
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
//1:1 user id가 refreshToken 테이블에 생성
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

//N:1
db.file.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
//1:N
db.user.hasMany(db.userNovelStatus, {
    foreignKey: 'userId', sourceKey: 'id'
});

//N:1
db.userNovelStatus.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
// //1:N
// db.user.hasMany(db.item, {
//     foreignKey: 'ownerId', sourceKey: 'id'
// });
//
// //N:1
// db.item.belongsTo(db.user, {
//     foreignKey: 'ownerId', targetKey: 'id'
// });
//1:N
db.user.hasMany(db.file, {
    foreignKey: 'userId', sourceKey: 'id'
});

//N:1
db.episode.belongsTo(db.novel, {
    foreignKey: 'novelId', sourceKey: 'id'
});
//1:N
db.novel.hasMany(db.episode, {
    foreignKey: 'novelId', targetKey: 'id'
});

//N:1
db.page.belongsTo(db.episode, {
    foreignKey: 'episodeId', targetKey: 'id'
});
//1:N
db.episode.hasMany(db.page, {
    foreignKey: 'episodeId', sourceKey: 'id'
});
db.ROLES = ["user", "admin"];

module.exports = db;
