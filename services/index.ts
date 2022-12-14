import { request, gql } from "graphql-request";
import { NewCommentProps } from "../typedef";

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

export const getSimilarPosts = async (categories: string[], slug: string,) => {
  const query = gql`
  query GetPostDetails($slug: String!, $categories: [String!]) {
  posts(
    where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
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
  const results = await request(graphqlAPI, query, { categories, slug });
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


export const getPostDetails = async (slug: string) => {
  const query = gql`
	query GetPostDetails($slug: String!) {
    post(where: {slug: $slug}) {
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
        content {
          raw
        }
        comments {
          id
          name
          email
          comment
        }

    }
	}
	`
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
}

export const submitComment = async (obj: NewCommentProps) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        comment
        createdAt
        id
        name
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
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
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

