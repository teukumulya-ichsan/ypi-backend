const CommentService = require('@comments/services');

class CommentController {
  constructor() {
    this.commentService = new CommentService();
    this.indexBerita = this.indexBerita.bind(this);
    this.indexEvent = this.indexEvent.bind(this);
  }

  async indexBerita(req, res) {
    const result = await this.commentService.indexBerita(req.query);
    res.send(result);
  }

  async indexEvent(req, res) {
    const result = await this.commentService.indexEvent(req.query);
    res.send(result);
  }
}

module.exports = CommentController;
