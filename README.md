#  Sample Blog

This is a simple full-stack blog application built using **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Bootstrap 5**. Users can create, view, edit, and comment on blog posts.

---

##  Features

-  Create new blog posts with author, title, tags, and content
-  Rich-text editor using **Quill.js**
-  View all blog posts with timestamps
-  Edit existing posts inside a modal
-  Add comments to each post (under development)
-  Clean and responsive Bootstrap design
-  Green-themed UI consistent across all pages

---

##  Technologies Used

- **Frontend**: EJS, Bootstrap 5, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Editor**: Quill.js for rich text editing

---

##  Project Structure
sample-blog/
├── views/
│   ├── pages/              # EJS pages: home.ejs, article.ejs, new-post.ejs, etc.
│   └── partials/           # Reusable EJS components: header.ejs, footer.ejs, menu.ejs
├── public/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── images/
│   │   ├── logo.png        # Blog logo
│   │   ├── edit.png        # Edit icon
│   │   └── comment.png     # Comment icon
│   └── uploads/            # Folder for uploaded media/images
├── app.js                  # Main Express server
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation


