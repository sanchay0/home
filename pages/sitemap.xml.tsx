import { fetchBlogs } from "../utils/api";

export async function getServerSideProps({ res }) {
  const allBlogs: IPost[] = await fetchBlogs();
  const siteUrl: string = process.env.NEXT_PUBLIC_URL;

  // generate the XML sitemap with the posts data
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${`${siteUrl}/`}</loc>
            </url>
            <url>
                <loc>${`${siteUrl}/blog`}</loc>
            </url>
            ${allBlogs
              .map(
                ({ id }) => `
                    <url>
                        <loc>${`${siteUrl}/blog/${id.replace("&", "&amp;")}`}</loc>
                    </url>  
                `,
              )
              .join("")}
            <url>
                <loc>${`${siteUrl}/contact`}</loc>
            </url>
        </urlset>
    `;

  res.setHeader("Content-Type", "text/xml");

  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  return null;
}
