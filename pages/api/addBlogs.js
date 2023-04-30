import Blog from '../../models/Blogs.js';
import connectDb from '../../middleware/mongoose';
import data from '/data/data.json';

//Jhon: swordwithsalt
//Jane: udtaparinda

export const handler = async (req, res) => {
  if (req.method == 'POST') {
    for (let i = 0; i < req.body.length; i++) {
      let b = new Blog({
        title: req.body[i].title,
        blog_id: req.body[i].blog_id,
        content: req.body[i].content,
        description: req.body[i].description,
        image: req.body[i].image,
        likes: req.body[i].likes,
        comments: req.body[i].comments,
      });
      try {
        await b.save();
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ success: 'added' });
  } else {
    res.status(400).json({ error: 'This method is not allowed' });
    console.log(res.body);
  }
};

export default connectDb(handler);
