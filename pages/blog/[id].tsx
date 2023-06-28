import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/clientApp'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Custom404 from '../404'

export const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/); // Split the text into words
    const wordCount = words.length;
    const readingTimeInMinutes = Math.ceil(wordCount / 238); // Divide word count by average reading speed and round up
    return readingTimeInMinutes;
}

export default function Post() {
    const router = useRouter();
    const { id } = router.query;

    const fetchPost = async () => {
        const q = doc(db, "blogs", `${id}`)
        const response  = await getDoc(q)
        if (response.exists) {
            return response.data()
        }
    }

    const { data: post, isLoading, isError } = useQuery(['post', id], fetchPost)

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
