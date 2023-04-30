import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Blog from '../models/Blogs';
import mongoose from 'mongoose';

export default function Home({ blogs }) {
  return (
    <div className={styles.container}>
      <Head></Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <Image
              src={'https://images7.alphacoders.com/865/865098.jpg'}
              alt='Hero Image'
              width='1000'
              height='800'
              className={styles.heroImage}
            />
            <div className={styles.heroText}>
              <h1>Welcome to our Blog</h1>
              <p>Discover new ideas and insights</p>
            </div>
          </div>
          <section className={styles.featuredBlogs}>
            <h2>Featured Blogs</h2>
            <div className={styles.blogCards}>
              {blogs.map((bl) => {
                return (
                  <Link
                    href={`/blogs/${bl.title}`}
                    passHref={true}
                    key={bl.title}
                    className={styles.blogCard}
                  >
                    <img src={bl.image} alt='Blog 1' />
                    <h3>{bl.title}</h3>
                    <p>{bl.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let blogs = await Blog.find();
  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs)) },
  };
};
