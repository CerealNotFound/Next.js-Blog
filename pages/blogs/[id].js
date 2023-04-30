import Blog from '../../models/Blogs';
import mongoose from 'mongoose';
import Image from 'next/image';
import styles from '../../styles/BlogPage.module.scss';
import Comments from '../../components/Comments/Comments';

const blog = ({ blog }) => {
  return (
    <div className={styles.blogPage}>
      <h1 id={styles.title}>{blog.title}</h1>
      <Image
        id={styles.blogImage}
        src={blog.image}
        width='400'
        height='300'
        alt={blog.title}
      />
      <p id={styles.content}>{blog.content}</p>
      <h3 className={styles.like_commentsWrapper}>Likes 💖: {blog.likes}</h3>
      <Comments prop={blog} />
    </div>
  );
};

export default blog;

export const getStaticProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const blogId = context.params.id;
  const all_blogs = await Blog.find();
  let blog = await all_blogs.find((bl) => bl.title === blogId);

  // console.log(blog);
  return {
    props: {
      // allBlogs: JSON.parse(JSON.stringify(all_blogs)),
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
};

export async function getStaticPaths() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // let blogs = await Blog.find();
  const all_blogs = await Blog.find();
  const allPaths = all_blogs.map((bl) => {
    // console.log(bl.title);
    return {
      params: { id: bl.title.toString() },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}
