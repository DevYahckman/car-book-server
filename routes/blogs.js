const express = require("express");
const router = express.Router();
const { Blog, validate } = require("../model/blog");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(400).send("The blog is not available");
  res.send(blog);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blog = new Blog(_.pick(req.body, ["title", "blog"]));

  await blog.save();
  res.send(blog);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: _.pick(req.body, ["title", "blog"]) },
    { new: true }
  );

  if (!blog) return res.status(400).send("The Blog is unavaiable ");

  res.send(blog);
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);
  if (!blog) return res.status(404).send("The car is not available");
  res.send(blog);
});

module.exports = router;
