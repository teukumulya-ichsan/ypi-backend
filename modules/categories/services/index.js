const CategoryModel = require("@categories/models");

class CategoryService {
  constructor() {
    this.categoryModel = new CategoryModel();
  }

  async indexBerita(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    // contoh yang bener
    return await this.categoryModel.indexBerita(search, sortBy, order);
  }

  async indexEvent(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    return await this.categoryModel.indexEvent(search, sortBy, order);
  }
}

module.exports = CategoryService;
