import styles from '../../styles/Blogs.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Blog from '../../models/Blogs';
import mongoose from 'mongoose';

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs Page</h1>
      {blogs.map((items) => {
        return (
          <Link
            href={`/blogs/${items.title}`}
            passHref={true}
            className={styles.card}
            key={`${items.title} wrapper`}
          >
            <div>
              <Image
                className={styles.cardImage}
                src={items.image}
                alt={items.title}
                width='400'
                height='300'
              />
              <h1 className={styles.cardTitle}>{items.title}</h1>
              <p className={styles.cardDescription}>{items.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let blogs = await Blog.find();
  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs)) },
  };
};

export default Blogs;
