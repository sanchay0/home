import { useRouter } from 'next/router'
import { calculateReadingTime } from '../../utils/helpers'
import { fetchBlog } from '../../utils/api';
import { useEffect, useState } from 'react';

export default function Blog() {
    const [post, setPost] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getData = async () => {
            const fetchedData = await fetchBlog(id)
            setPost(fetchedData)
        }
      
        getData()
    }, [id])

    return (
        <>
        { post ?
            <div className="mx-auto max-w-xl">
                <div className="font-light text-sm mt-16">
                    <p className="text-black">{post.title}</p>
                    <p>{post.created_at.toDate().toDateString()}</p>
                    <p>{calculateReadingTime(post.content)} minute read</p>
                    {post.updated_at ? <p>{post.updated_at.toDate().toDateString()}</p> : <p></p>}
                    <div className="text-neutral-500 dark:text-neutral-400 mt-3 space-y-3">
                    <p>{post.content}</p>
                    </div>
                </div>
            </div> : <></>
        }
        </>
    );
}
