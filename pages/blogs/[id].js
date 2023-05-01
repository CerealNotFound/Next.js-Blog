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
      <h3 className={styles.like_commentsWrapper}>Likes ❤️: {blog.likes}</h3>
      <Comments props={blog}/>
    </div>
  );
};

export default blog;

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const blogId = context.params.id;
  console.log(context.params);
  const all_blogs = await Blog.find();
  let blog = await all_blogs.find((bl) => bl.title === blogId);

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
};
