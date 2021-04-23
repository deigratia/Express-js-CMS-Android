module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z]+$/i,
          isLowercase: true,
        },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z]+$/i,
          isLowercase: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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

  return User;
};
