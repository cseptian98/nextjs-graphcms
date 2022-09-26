import { graphql } from 'graphql'
import { request, gql } from 'graphql-request'

const graphqlApi: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
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
            excerpt
            slug
            title
            featuredImages {
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

  const results = await request(graphqlApi, query)

  return results.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImages {
          url
        }
        createdAt
        slug
      }
    }
  `

  const results = await request(graphqlApi, query)

  return results.posts
}

export const getPostDetails = async (slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        excerpt
        slug
        title
        featuredImages {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `

  const results = await request(graphqlApi, query, { slug })

  return results.post
}

export const getSimilarPosts = async (categories: string, slug: any) => {
  const query = gql`
    query GetPostDetail($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImages {
          url
        }
        createdAt
        slug
      }
    }
  `

  const results = await request(graphqlApi, query, { categories, slug })

  return results.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

  const results = await request(graphqlApi, query)

  return results.categories
}

export const submitComment = async (obj: object) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}

export const getComments = async (slug: any) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug }}) {
        name
        createdAt
        comment
      }
    }
  `

  const results = await request(graphqlApi, query, { slug })

  return results.comments
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImages {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlApi, query);

  return result.posts;
};

export const getCategoryPost = async (slug : any) => {
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
            featuredImages {
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

  const result = await request(graphqlApi, query, { slug });

  return result.postsConnection.edges;
};

export const getAdjacentPosts = async (createdAt: string, slug: any) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImages {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImages {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};