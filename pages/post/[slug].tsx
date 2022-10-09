import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import {
  PostWidget,
  Categories,
  PostDetail,
  Author,
  Comments,
  CommentsForm,
  Comment,
} from "../../components";
import { getPosts, getPostDetails } from "../../services";
import { CategoryProp } from "../../typedef";

export default function PostDetails({ post }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments postComments={post.comments} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map(
                (category: CategoryProp) => category.slug
              )}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = (params as ParsedUrlQuery).slug;
  const data = await getPostDetails(slug);
  return {
    props: { post: data },
  };
};

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
