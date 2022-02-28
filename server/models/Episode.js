module.exports = (sequelize, Sequelize) => {
    const Episode = sequelize.define("episode", {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            number: {
                type: Sequelize.STRING
            },
            prevEpisode: {
                type: Sequelize.STRING
            },
            prevChoice: {
                type: Sequelize.STRING
            },
            prevItem: {
                type: Sequelize.STRING
            }
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return Episode;
};