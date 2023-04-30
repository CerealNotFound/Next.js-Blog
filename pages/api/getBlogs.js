import Blog from '../../models/Blogs';
import connectDb from '../../middleware/mongoose';

export const handler = async (req, res) => {
  let blogs = await Blog.find();
  res.status(200).json({ blogs });
};

export default connectDb(handler);
