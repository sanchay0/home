import { Feed, FeedOptions } from 'feed'
import { fetchBlogs } from '../utils/api'


export async function getServerSideProps({ res }) {
    const allPosts: IPost[] = await fetchBlogs()
    const siteUrl: string = process.env.URL

    const feedOptions: FeedOptions = {
        title: 'Sanchay\'s blog posts | RSS Feed',
        description: 'Welcome!',
        language: 'en',
        id: siteUrl,
        link: siteUrl,
        image: `${siteUrl}/favicon.ico`,
        favicon: `${siteUrl}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}`,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${siteUrl}/rss.xml`,
        },
        author: {
            name: 'Sanchay Javeria',
            email: 'sanchayjaveria@gmail.com',
            link: 'https://sanchayjaveria.com/'
        },
    }

    const feed: Feed = new Feed(feedOptions)

    allPosts.map((post: IPost) => {
        const category = post.tags?.map((tag) => ({
                name: tag.name,
            })) || []
        feed.addItem({
            title: post.title,
            id: `${siteUrl}/blog/${post.id}`,
            link: `${siteUrl}/blog/${post.id}`,
            content: post.content,
            date: post.createdAt,
            author: [{
                name: post.author,
                email: 'sanchayjaveria@gmail.com',
                link: 'https://sanchayjaveria.com/'
            }],
            published: post.createdAt,
            category,
        })
        return post
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