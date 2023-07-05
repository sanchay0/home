import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Blogs from '..'
import { fetchTag } from '../../../utils/api'

export default function Labels() {
    const [tag, setTag] = useState<ITag>(null)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getTag = async () => {
            try {
                if (id) {
                    const fetchedTag: ITag = await fetchTag(id)
                    setTag(fetchedTag)
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }
        getTag()
    }, [id])

    return <Blogs tag={tag} />
}