const CommentsModel = require('@comments/models');

class CommentService {
  constructor() {
    this.commentModel = new CommentsModel();
  }

  async indexBerita(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const commentBerita = await this.commentModel.indexBerita(
      search,
      sortBy,
      order
    );

    return {
      data: commentBerita
    };
  }

  async indexEvent(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const commentEvent = await this.commentModel.indexEvent(
      search,
      sortBy,
      order
    );

    return {
      data: commentEvent
    };
  }
}

module.exports = CommentService;
