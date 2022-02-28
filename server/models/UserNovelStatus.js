module.exports = (sequelize, Sequelize) => {
    const UserNovelStatus = sequelize.define("userNovelStatus", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            novelId: {
                type: Sequelize.INTEGER
            },
            episode: {
                type: Sequelize.STRING
            },
            currentPage: {
                type: Sequelize.INTEGER
            },
            current: {
                type: Sequelize.INTEGER
            }
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return UserNovelStatus;
};
