const CategoryModel = require('@categories/models');

class CategoryService {
  constructor() {
    this.categoryModel = new CategoryModel();
  }

  async indexBerita(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const categoryBerita = await this.categoryModel.indexBerita(
      search,
      sortBy,
      order
    );

    return {
      categoryBerita
    };
  }

  async indexEvent(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const categoryEvent = await this.categoryModel.indexEvent(
      search,
      sortBy,
      order
    );

    return {
      categoryEvent
    };
  }
}

module.exports = CategoryService;
