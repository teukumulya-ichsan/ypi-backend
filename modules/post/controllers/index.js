const PostService = require("@post/services");

class PostController {
  constructor() {
    this.postService = new PostService();
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.postService.index()
    });
  }
}
