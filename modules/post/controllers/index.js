const PostService = require("@post/services");

class PostController {
  constructor() {
    this.postService = new PostService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getPostDetail = this.getPostDetail.bind(this);
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

  async update(req, res) {
    const postId = req.params.id;
    const postData = req.body;

    // console.log(postData);

    const updatePost = await this.postService.update(postId, postData);

    res.status(updatePost.status);

    if (updatePost.status === 200) {
      res.send({
        data: updatePost
      });
    }

    res.send({
      error: updatePost.error
    });
  }

  async delete(req, res) {
    const postId = req.params.id;

    const deletePost = await this.postService.delete(postId);

    res.status(deletePost.status);

    if (deletePost.status === 200) {
      res.send({
        data: deletePost.data
      });
    }

    res.send({
      error: deletePost.error
    });
  }

  async getPostDetail(req, res) {
    res.send({
      data: await this.postService.getById(req.params.id)
    });
  }
}

module.exports = PostController;
