const PostService = require("@post/services");

class PostController {
  constructor() {
    this.postService = new PostService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.postService.index()
    });
  }

  async create(req, res) {
    const savePost = await this.postService.create(req.body);

    res.status(savePost.status);

    if (savePost.status === 200) {
      res.send({
        data: savePost
      });
    }

    res.send({
      error: savePost.error
    });
  }
}

module.exports = PostController;
