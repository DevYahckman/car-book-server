const mongoose = require("mongoose");
const Joi = require("joi");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  blog: { type: String, required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

function validateBlog(blog) {
  const schema = Joi.object({
    title: Joi.string().required(),
    blog: Joi.string().required(),
  });

  return schema.validate(blog);
}

exports.Blog = Blog;
exports.blogSchema = blogSchema;
exports.validate = validateBlog;
