import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts } from "../services";
import { PostNodeProps, PostProps } from "../typedef";

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Talks Of Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: PostNodeProps) => (
            <PostCard post={post.node} key={post.node.id} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:stick relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts: PostNodeProps[] = (await getPosts()) || [];
  return {
    props: { posts },
  };
};
