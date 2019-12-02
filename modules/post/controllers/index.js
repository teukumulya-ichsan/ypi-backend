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

    if (savePost.status !== 200) {
      res.status(500);
      res.send({
        message: "Internal Server Error"
      });
    }

    res.status(200); //accepted
    res.send({
      data: savePost
    });
  }
}

module.exports = PostController;
