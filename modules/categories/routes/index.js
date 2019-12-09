const CategoryController = require('@categories/controllers');

module.exports = app => {
  const categoryController = new CategoryController();

  app.route('/category-berita').get(categoryController.indexBerita);

  app.route('/category-event').get(categoryController.indexEvent);
};
