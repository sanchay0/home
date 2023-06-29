import { Feed } from 'feed'
import { fetchBlogs } from '../utils/api'

export async function getServerSideProps({ res }) {
    const allPosts = await fetchBlogs();
    const site_url = process.env.URL;

    const feedOptions = {
        title: 'Sanchay\'s blog posts | RSS Feed',
        description: 'Welcome!',
        id: site_url,
        link: site_url,
        image: `${site_url}/favicon.ico`,
        favicon: `${site_url}/favicon.ico`,
        copyright: `All rights reserved ${new Date().getFullYear()}`,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${site_url}/rss.xml`,
        },
    };

    const feed = new Feed(feedOptions);

    allPosts.forEach((post) => {
     feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.id}`,
      link: `${site_url}/blog/${post.id}`,
      content: post.content,
      date: post.created_at.toDate(),
     });
    });

    const xmlContent = feed.atom1();

    res.setHeader('Content-Type', 'text/xml');

    res.write(xmlContent);
    res.end();

    return { props: {} };
}

export default function RssXmlPage() {
    return null
}