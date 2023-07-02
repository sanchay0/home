import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { calculateReadingTime, formatFirestoreDate } from '../../utils/helpers'
import { fetchBlog, fetchComments, fetchLikes } from '../../utils/api'

// Custom hook to manage collapse state
const useCollapseState = (initialState = false) => {
    const [collapsed, setCollapsed] = useState(initialState)

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return { collapsed, toggleCollapse }
}

type Props = {
    comment: IComment
}

function Comment({ comment }: Props) {
    const { collapsed, toggleCollapse } = useCollapseState(false)
    const { collapsed: collapsedButton, toggleCollapse: toggleCollapseButton } = useCollapseState(true)

    return (
        <article className="mt-8">
            <footer>
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">{comment.name}</p>
                    <p className="text-sm text-gray-600">{formatFirestoreDate(comment.time)}</p>
                </div>
            </footer>
            <p className="mt-2">{comment.content}</p>
            {comment.replies && comment.replies.length > 0 ?
                <div className="flex mt-2 items-center duration-200">
                    <button type="button" tabIndex={0} onClick={toggleCollapse} className="flex items-center text-sm text-gray-500">
                    {collapsed ? 
                        <i className="fas fa-caret-right mr-2" /> : 
                        <i className="fas fa-caret-down mr-2" />} 
                        <span className="hover:no-underline underline">Replies</span>
                    </button>
                </div> : null
            }
            {!collapsed &&
                comment.replies.map(reply => (
                    <article key={reply.id} className="p-6 pb-0 ml-6 lg:ml-6">
                        <footer className="flex justify-between items-center">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900">{reply.name}</p>
                                <p className="text-sm text-gray-600">{formatFirestoreDate(reply.time)}</p>
                            </div>
                        </footer>
                        <p className="mt-2">{reply.content}</p>
                    </article>
                ))
            }
            {!collapsedButton &&
                <div className="lg:ml-12">
                    <textarea
                    id="post-reply"
                    rows={1}
                    className="focus:outline-none resize-none block p-2.5 w-full border-b border-gray-300 focus:border-gray-600 mt-2 placeholder-gray-400"
                    placeholder="Write a comment" />
                    <div className="flex mt-4 items-center">
                        <button type="button"
                            className="flex items-center text-sm text-gray-500 duration-200 hover:no-underline underline">
                            Post Reply
                        </button>
                    </div>
                </div>
            }
            <div className="flex mt-2 items-center">
                <button type="button" tabIndex={0} onClick={toggleCollapseButton}
                    className="flex items-center text-sm text-gray-500 duration-200 hover:no-underline underline">
                    Reply
                </button>
            </div>
        </article>
    )
}

export default function Blog() {
    const [post, setPost] = useState<IPost>(null)
    const [likes, setLikes] = useState<ILike[]>(null)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState<IComment[]>(null)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedData: IPost = await fetchBlog(id)
                setPost(fetchedData)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }

        const getLikes = async () => {
            try {
                const fetchedData: ILike[] = await fetchLikes(id)
                setLikes(fetchedData)
            } catch (error) {
                setLikes([])
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }

        const getComments = async () => {
            try {
                const fetchedData: IComment[] = await fetchComments(id)
                setComments(fetchedData)
            } catch (error) {
                setComments([])
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }
      
        getPost()
        getLikes()
        getComments()
    }, [id])

    const registerLike = () => {
      // TODO: set likes in firestore, get name from gmail login (add a hash to make it unique)
      if (liked) {
        setLikes((prevLikes) => prevLikes.filter((like) => like.name !== 'test'))
      } else {
        setLikes((prevLikes) => [...prevLikes, { name: 'test', time: (new Date()).getTime }])
      }
      setLiked((prevIsLiked) => !prevIsLiked)
    }

    return (
        <div className="mx-auto max-w-xl">
            { post ?
                <div className="font-light text-sm mt-16">
                    <p className="text-black">{post.title}</p>
                    <p className="mt-5">{post.created_at.toDateString()} <span className="mr-2 ml-2">/</span> {calculateReadingTime(post.content)} minute read</p>
                    <div className="text-neutral-500 mt-5 space-y-3">
                    <p>{post.content}</p>
                    </div>
                </div> : null
            }
            { likes && comments ? 
                <div className="flex justify-between items-center mt-16">
                    <span>{`${comments.length} comment(s)`}</span>
                    <div className="flex items-center">
                        <button type="button"
                        className={`cursor-pointer hover:text-black transition-colors duration-300 ${liked ? 'text-black font-normal' : ''}`}
                        onClick={registerLike}
                        tabIndex={0}
                        >
                            <i className="fa fa-thumbs-up mr-2" aria-hidden="true" />
                            <span>Like</span>
                        </button>
                        <span className="mr-2 ml-2">•</span>
                        <span>{`${likes.length} like(s)`}</span>
                    </div>
                </div> : null
            }
            {/* TODO: Add ability to write comments/replies to firestore; hook google signup */}
            { comments ? 
                <div>
                    <textarea
                    id="post"
                    rows={1}
                    className="focus:outline-none resize-none block p-2.5 w-full border-b border-gray-300 focus:border-gray-600 mt-2 placeholder-gray-400"
                    placeholder="Write a comment" />
                    <div className="flex mt-4 items-center">
                        <button type="button"
                            className="flex items-center text-sm text-gray-500 duration-200 hover:no-underline underline">
                            Post
                        </button>
                    </div>

                    { comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                </div> : null
            }
        </div>
    )
}
