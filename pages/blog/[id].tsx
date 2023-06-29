import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Custom404 from '../404'
import { calculateReadingTime } from '../../utils/helpers'
import { fetchBlog } from '../../utils/api';

export default function Blog() {
    const router = useRouter();
    const { id } = router.query;

    const { data: post, isLoading, isError } = useQuery(['post', id], () => fetchBlog(id))

    if (isError) {
        return <Custom404></Custom404>
    }

    return (
        <>
        { isLoading || !post ? <></> :
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
        </div>
        }
        </>
    );
}
