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

export const getPostDetails = async (slug) => {
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

export const getSimilarPosts = async (categories, slug) => {
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
