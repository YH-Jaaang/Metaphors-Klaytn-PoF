module.exports = (sequelize, Sequelize) => {
    const Personality = sequelize.define("personality", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            personality: {
                type: Sequelize.STRING
            },
            imagePath: {
                type: Sequelize.STRING
            },
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return Personality;
};