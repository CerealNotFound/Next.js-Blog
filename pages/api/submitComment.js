import Blog from '../../models/Blogs';
import connectDb from '../../middleware/mongoose';

export const handler = async (req, res) => {
  if (req.method == 'POST') {
    const all_blogs = await Blog.find();
    for (let i = 0; i < all_blogs.length; i++) {
      if (all_blogs[i].title === req.body.title) {
        const filter = { title: req.body.title };
        all_blogs[i].comments.push(req.body.comment);
        const update = {
          comments: all_blogs[i].comments,
        };
        const updated = await Blog.findOneAndUpdate(filter, update, {
          new: true,
        });
      }
    }
    res.status(200).json({ success: 'operation successful' });
  } else {
    res.status(400).json({ error: 'This method is not allowed' });
    console.log(res.body);
  }
};

export default connectDb(handler);
