import Head from 'next/head'
import { Categories, PostCard, PostWidget } from '../components'
import FeaturedPosts from '../sections/FeaturedPosts'
import { getPosts } from '../services'

export default function Home({ posts }: { posts: any }) {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard
              key={post.node.title}
              author={post.node.author}
              createdAt={post.node.createdAt}
              excerpt={post.node.excerpt}
              featuredImages={post.node.featuredImages}
              slug={post.node.slug}
              title={post.node.title}
            />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: {
      posts,
    },
  }
}
