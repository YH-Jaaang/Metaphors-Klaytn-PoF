module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genre", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true

            },
            genre: {
                type: Sequelize.STRING
            },
        },
        {
            createdAt: false,
            updatedAt: false,
        });

    return Genre;
};