module.exports = (sequelize, Sequelize) => {
    const Novel = sequelize.define("novel", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            imagePath: {
                type: Sequelize.STRING
            },
            issueDate: {
                type: Sequelize.DATE
            },
            description: {
                type: Sequelize.STRING
            },
            nftItems: {
                type: Sequelize.STRING
            },
            genre: {
                type: Sequelize.STRING
            }
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return Novel;
};
