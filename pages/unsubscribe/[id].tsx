import { useRouter } from 'next/router'
import { useState } from 'react'
import { deleteSubscriber } from '../../utils/api'

export default function Unsubscribe() {
    const router = useRouter()
    const { id } = router.query
    const [unsubscribed, setUnsubscribed] = useState(false)

    const unsubscriber = async () => {
        await deleteSubscriber(`${id}`)
        setUnsubscribed(true)
    }

    return (
        unsubscribed ? 
        <div>Unsubscribed successfully!</div> :
        <div>
            Sorry to see you go. Please <button
                type="button"
                className="font-normal text-black items-center text-sm duration-200 hover:no-underline underline"
                onClick={unsubscriber}
            >
                confirm
            </button> to unsubscribe.
        </div>
    )
}