import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/clientApp'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/); // Split the text into words
    const wordCount = words.length;
    const readingTimeInMinutes = Math.ceil(wordCount / 238); // Divide word count by average reading speed and round up
    return readingTimeInMinutes;
}

export default function Post() {
    const [post, setPost] = useState(null)
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const q = doc(db, "blogs", `${id}`)
        const fetchPost = async () => {
            const response  = await getDoc(q)
            if (response.exists) {
                setPost(response.data())
            }
        }

        if (id) {
            fetchPost()
        }
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
