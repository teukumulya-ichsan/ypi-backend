const CategoryService = require("@categories/services");

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
    this.indexBerita = this.indexBerita.bind(this);
    this.indexEvent = this.indexEvent.bind(this);
  }

  async indexBerita(req, res) {
    const result = await this.categoryService.indexBerita(req.query);
    // contoh yang bener
    res.send({
      data: result
    });
  }

  async indexEvent(req, res) {
    const result = await this.categoryService.indexEvent(req.query);
    res.send({
      data: result
    });
  }
}

module.exports = CategoryController;
