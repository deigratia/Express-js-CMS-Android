module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define(
    "List",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^[a-z]+$/i,
          isLowercase: true,
        },
      },
   
      checkin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      checkout: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdDate: {
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
        defaultValue: Sequelize.Now,
      },
      updatedDate: {
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
        defaultValue: Sequelize.Now,
      },
    },
    {
      timestamps: true,
      createdAt: "createdDate",
      updatedAt: "updatedDate",
      freezeTableName: true,
    }
  );

  return List;
};
