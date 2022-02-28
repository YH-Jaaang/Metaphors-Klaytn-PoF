module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("page", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            number: {
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.STRING(1000)
            },
            hasChoice: {
                type: Sequelize.BOOLEAN
            },
            choice: {
                type: Sequelize.STRING
            }
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return Page;
};