import { useRouter } from 'next/router'
import { deleteSubscriber } from '../../utils/api'

export default function Unsubscribe() {
    const router = useRouter()
    const { id } = router.query

    const unsubscriber = async () => {
        deleteSubscriber(`${id}`)
    }

    return (
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