module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define("file", {
    file_path: {
      type: Sequelize.STRING,
    },
  },
  // {
  //     freezeTableName: true,
  //     tableName : "file"
  // }
  );

  return File;
};
