import { request, gql } from "graphql-request";
import { CategoryProp } from "../typedef";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export const getPosts = async () => {
  const query = gql`
	query MyQuery {
		postsConnection {
    edges {
      node {
		id
        author {
          bio
          name
          photo {
            url
          }
          id
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  }
	}
	`
  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
}

export const getRecentPosts = async () => {
  const query =
    gql`
   query getPostDetails() {
    posts(orderBy: createdAt_ASC last: 3) {
      id
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
   }
  `
  const results = await request(graphqlAPI, query);
  return results.posts;
}

export const getSimilarPosts = async (slug: string, categories: string[]) => {
  const query = gql`
  query getPostDetails($slug: String!, $categories: [String!]) {
  posts(
    where: {slug_not: $slug, AND: {categories_some: {$slug_in: $categories}}}
    last: 3
  ) {
      id
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
}

`
  const results = await request(graphqlAPI, query);
  return results.posts;
}

export const getCategories = async () => {
  const query = gql`
    query GetGetCategories{
      categories {
        id
        name
        slug
      }
    }
  `
  const results = await request(graphqlAPI, query);
  return results.categories;
}