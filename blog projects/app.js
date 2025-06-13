const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 3000;

// Database Connection
const url = "mongodb+srv://anitaantony146:AnitA12345@cluster0.qpmnltj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware & Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Schema & Model
const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  tags: [String],
  body: String,
  createdAt: { type: Date, default: Date.now },
  comment: { type: [String], default: [] }
});
const Blog = mongoose.model("Blog", blogSchema);

// Routes
app.get("/", async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    res.render("index", { count });
  } catch (err) {
    res.status(500).send("Error loading homepage");
  }
});

app.get("/home", async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.render("home", { posts });
  } catch (err) {
    res.status(500).send("Error fetching posts");
  }
});

app.get("/article/:id", async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    res.render("article", { post });
  } catch (err) {
    res.status(500).send("Article not found");
  }
});

app.post("/article/:id/edit", async (req, res) => {
  const { author, title, tags, body } = req.body;
  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      author,
      title,
      tags: tags.split(",").map(t => t.trim()),
      body
    });
    res.redirect(`/article/${req.params.id}`);
  } catch (err) {
    console.error("Edit Error:", err);
    res.status(500).send("Error updating the post");
  }
});

app.post("/upload-image", (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const image = req.files.image;
  const filename = `${Date.now()}-${image.name}`;
  const savePath = path.join(uploadDir, filename);

  image.mv(savePath, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).send("Error saving image");
    }
    res.json({ url: `/uploads/${filename}` });
  });
});

app.get("/new-post", (req, res) => {
  res.render("new-post");
});

app.post("/submit-post", async (req, res) => {
  const { author, title, tags, body } = req.body;
  try {
    const newPost = new Blog({
      author,
      title,
      tags: tags.split(",").map(t => t.trim()),
      body
    });
    await newPost.save();
    res.redirect("/home");
  } catch (err) {
    res.status(500).send("Error creating post");
  }
});

app.post("/article/:id/comment", async (req, res) => {
  try {
    const { comment } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, {
      $push: { comment }
    });
    res.redirect(`/article/${req.params.id}`);
  } catch (err) {
    res.status(500).send("Error adding comment");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
