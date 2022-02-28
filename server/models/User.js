module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
            // username: {
            //   type: Sequelize.STRING
            // },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            nickname: {
                type: Sequelize.STRING
            },
            genre1: {
                type: Sequelize.STRING
            },
            genre2: {
                type: Sequelize.STRING
            },
            genre3: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            privateKey: {
                type: Sequelize.STRING
            },
            cookie: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return User;
};
