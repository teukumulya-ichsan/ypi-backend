"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      title: { type: Sequelize.STRING(225), allowNull: false },
      description: {
        type: Sequelize.STRING(255)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  }
};
