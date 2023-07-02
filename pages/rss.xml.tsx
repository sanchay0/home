import { Feed, FeedOptions } from 'feed'
import { fetchBlogs } from '../utils/api'

export async function getServerSideProps({ res }) {
    const allPosts: IPost[] = await fetchBlogs()
    const siteUrl: string = process.env.URL

    const feedOptions: FeedOptions = {
        title: 'Sanchay\'s blog posts | RSS Feed',
        description: 'Welcome!',
        id: siteUrl,
        link: siteUrl,
        image: `${siteUrl}/favicon.ico`,
        favicon: `${siteUrl}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}`,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${siteUrl}/rss.xml`,
        },
    }

    const feed: Feed = new Feed(feedOptions)

    allPosts.map((post: IPost) => {
        feed.addItem({
            title: post.title,
            id: `${siteUrl}/blog/${post.id}`,
            link: `${siteUrl}/blog/${post.id}`,
            content: post.content,
            date: post.created_at,
            // TODO: add cateogry from tags
        })
        return post;
    })

    const xmlContent: string = feed.atom1()

    res.setHeader('Content-Type', 'text/xml')

    res.write(xmlContent)
    res.end()

    return { props: {} }
}

export default function RssXmlPage() {
    return null
}