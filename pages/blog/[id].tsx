import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { doc } from 'firebase/firestore'
import { calculateReadingTime, formatFirestoreDate } from '../../utils/helpers'
import { deleteLike, fetchBlog, fetchComments, fetchLikes, putLikeIfAbsent } from '../../utils/api'
import { db } from '../../firebase/clientApp'
import CustomTextarea from '../../components/CustomTextarea'
import { login, useAuth } from '../../utils/authHandler'


// Custom hook to manage collapse state
const useCollapseState = (initialState = false) => {
    const [collapsed, setCollapsed] = useState(initialState)

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return { collapsed, toggleCollapse }
}

type CProps = {
    comment: IComment
}

function Comment({ comment }: CProps) {
    const { collapsed, toggleCollapse } = useCollapseState(false)
    const { collapsed: collapsedButton, toggleCollapse: toggleCollapseButton } = useCollapseState(true)
    const [userReply, setUserReply] = useState('')

    const replyCallback = (value: string) => {
        setUserReply(value)
    }

    const registerReply = async () => {
        // TODO: write to firestore
        if (userReply) {
            // eslint-disable-next-line no-console
            console.log(userReply)
        }
    }

    return (
        <article className="mt-8">
            <footer>
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">{comment.name}</p>
                    <p className="text-sm text-gray-600">{formatFirestoreDate(comment.created_at)}</p>
                </div>
            </footer>
            <p className="mt-2">{comment.content}</p>
            {comment.replies && comment.replies.length > 0 ?
                <div className="flex mt-2 items-center duration-200">
                    <button type="button" tabIndex={0} onClick={toggleCollapse} className="font-light text-sm px-2 py-1 ml-2">
                    {collapsed ? 
                        <i className="fas fa-caret-right mr-2" /> : 
                        <i className="fas fa-caret-down mr-2" />} 
                        Replies
                    </button>
                </div> : null
            }
            {!collapsed && comment.replies &&
                comment.replies.map(reply => (
                    <article key={reply.id} className="pt-3 pb-3 pl-6 ml-6 lg:ml-6">
                        <footer className="flex justify-between items-center">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900">{reply.name}</p>
                                <p className="text-sm text-gray-600">{formatFirestoreDate(reply.created_at)}</p>
                            </div>
                        </footer>
                        <p className="mt-2">{reply.content}</p>
                    </article>
                ))
            }
            {!collapsedButton &&
                <div className="flex lg:ml-12">
                    <CustomTextarea id={`post-reply-${comment.id}`} width="w-3/4" callback={replyCallback} />
                    <div className="flex mt-4 items-center w-1/4">
                        <button type="button"
                            className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2"
                            onClick={registerReply}
                            >
                            Post Reply
                        </button>
                    </div>
                </div>
            }
            <div className="flex mt-2 items-center">
                <button type="button" tabIndex={0} onClick={toggleCollapseButton}
                    className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2">
                    Reply
                </button>
            </div>
        </article>
    )
}

export default function Blog() {
    const currentUser = useAuth()
    const [post, setPost] = useState<IPost>(null)
    const [likes, setLikes] = useState<ILike[]>(null)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState<IComment[]>(null)
    const [userComment, setUserComment] = useState('')
    const [shouldPrompt, setShouldPrompt] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getPost = async () => {
            try {
                if (id) {
                    const fetchedData: IPost = await fetchBlog(id)
                    setPost(fetchedData)
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }

        const getLikes = async () => {
            try {
                const fetchedData: ILike[] = await fetchLikes(id)
                if (currentUser) {
                    const index = fetchedData.findIndex(l => l.name === currentUser.email)
                    setLiked(index !== -1)
                }
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
    }, [id, currentUser])

    const commentCallback = (value: string) => {
        setUserComment(value)
    }

    const registerComment = async () => {
        // TODO: write to firestore
        if (userComment) {
            // eslint-disable-next-line no-console
            console.log(userComment)
        }
    }

    const registerLike = async () => {
        if (currentUser) {
            setShouldPrompt(false)
            if (liked) {
                // remove like
                const like = likes.find(l => l.name === currentUser.email)
                if (like) {
                    deleteLike(like.id)
                    setLikes((prevLikes) => prevLikes.filter(l => l.name !== currentUser.email))
                }
            } else {
                const newLike: ILike = {
                    created_at: new Date(),
                    name: currentUser.email,
                    post_id: doc(db, "blogs", `${id}`)
                }
                putLikeIfAbsent(newLike)
                setLikes((prevLikes) => [...prevLikes, { ...newLike }])
            }
            setLiked((prevIsLiked) => !prevIsLiked)
        } else {
            setShouldPrompt(!shouldPrompt)
        }
    }

    return (
        <>
            <Head>
                <title>{post ? post.title : "Sanchay's blog post"}</title>
            </Head>
            { post ?
                <div className="font-light text-sm mt-16">
                    <p className="text-black">{post.title}</p>
                    <p className="mt-5">{post.created_at.toDateString()} <span className="mr-2 ml-2">/</span> {calculateReadingTime(post.content)} minute read</p>
                    <div className="text-neutral-500 mt-5 space-y-3">
                    <p>{post.content}</p>
                    </div>
                </div> : null
            }
            <div className="flex mt-12">
            { post && post.tags && <>
                <span className="mr-2">Labels:</span>
                {post.tags.map(tag => (
                    <span key={tag.id} className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs px-3 py-1 duration-200 rounded-full mr-2">
                        <Link href={`/blog/labels/${tag.id}`}>{tag.name}</Link>
                    </span>
                ))}
                </>
            }
            </div>
            { likes && comments ? 
                <>
                <div className="flex justify-between items-center mt-8">
                    <span>{ comments.length > 0 ? `${comments.length} comment(s)` : null}</span>
                    <div className="flex items-center">
                        <span>{likes.length > 0 ? `${likes.length} like(s)` : null}</span>
                        <span className="mr-2 ml-2">{likes.length > 0 ? "•" : null}</span>
                        <button type="button"
                        className={`transition-colors duration-300 ${liked ? 'text-black font-medium' : ''}`}
                        onClick={registerLike}
                        tabIndex={0}
                        >
                            <i className={`${liked ? 'fas' : 'far'} fa-thumbs-up mr-2`} aria-hidden="true" />
                            <span>Like</span>
                        </button>
                    </div>
                </div>
                <div className="mt-2 text-center flex justify-end">
                { shouldPrompt ? 
                    <p className="text-xs">
                    To avoid spam, please <button
                    type="button"
                    className="font-normal text-black items-center duration-200 hover:no-underline underline"
                    onClick={() => login()}
                    >
                        login
                        </button> with your google account.
                    </p>
                    : null }
                </div>
                </> : null
            }
            { comments ? 
                <>
                <div className="flex mt-w items-center">
                    <CustomTextarea id="post" width="w-full" callback={commentCallback} />
                    <button type="button"
                        className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2"
                        onClick={registerComment}
                        >
                        Post
                    </button>
                </div>
                { comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                </> : null
            }
        </>
    )
}