const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    blog_id: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number },
    comments: [{ type: String }],
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model('Blog', BlogSchema);
