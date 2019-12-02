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
      post_type: {
        type: Sequelize.ENUM,
        values: ["post", "pages"]
      },
      content: {
        type: Sequelize.TEXT
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  }
};
