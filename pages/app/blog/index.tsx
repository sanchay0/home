import { useEffect, useState } from 'react'
import { db } from '../../../firebase/clientApp'
import { collection, getDocs } from 'firebase/firestore'

export default function HomePage() {
    const [data, setData] = useState(null)

    useEffect(() => {
        const blogs = async () => {
            const response  = await getDocs(collection(db, "blogs"))
            setData(response.docs)
        }

        blogs()
    }, [])

    return (
        <div>
            <p>
                Welcome to my blog!
            </p>
            {
                data ? (
                    <ul>
                        {
                            data.map(blog => ({id: blog.id, ...blog.data()})).map(entry => (
                                <li key={entry.id}>{entry.id}, {entry.title}</li>
                            ))
                        }
                    </ul>
                ) : <p>Loading..</p>
            }
        </div>
    )
}
