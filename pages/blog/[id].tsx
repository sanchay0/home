import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { doc } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { db } from '../../firebase/clientApp'
import { deleteLike, fetchBlog, fetchBlogs, fetchComments, fetchLikes, putLikeIfAbsent, putComment, putReply } from '../../utils/api'
import { calculateReadingTime, formatFirestoreDate } from '../../utils/helpers'
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
    comment: IComment;
    currentUser: User;
}

type BProps = {
    post: IPost;
    likes: ILike[];
    comments: IComment[];
}

function Comment({ comment, currentUser }: CProps) {
    const { collapsed, toggleCollapse } = useCollapseState(false)
    const { collapsed: collapsedButton, toggleCollapse: toggleCollapseButton } = useCollapseState(true)
    const [userReply, setUserReply] = useState('')
    const [replies, setReplies] = useState<ICommentRoot[]>(comment.replies)

    const replyCallback = (value: string) => {
        setUserReply(value)
    }

    const registerReply = async () => {
        if (userReply) {
            const newReply: ICommentRoot = {
                name: currentUser.displayName,
                content: userReply,
                createdAt: new Date(),
            }
            putReply(comment.id, newReply)
            setReplies(prevReplies => [...prevReplies, { ...newReply }])
            setUserReply('')
        }
    }

    return (
        <article className="mt-8">
            <footer>
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">{comment.name}</p>
                    <p className="text-sm text-gray-600">{formatFirestoreDate(comment.createdAt)}</p>
                </div>
            </footer>
            <p className="mt-2">{comment.content}</p>
            {replies && replies.length > 0 ?
                <div className="flex mt-2 items-center duration-200">
                    <button type="button" tabIndex={0} onClick={toggleCollapse} className="font-light text-sm px-2 py-1 ml-2">
                    {collapsed ? 
                        <i className="fas fa-caret-right mr-2" /> : 
                        <i className="fas fa-caret-down mr-2" />} 
                        Replies
                    </button>
                </div> : null
            }
            {!collapsed && replies &&
                replies.sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                ).map(reply => (
                    <article key={`${comment.id}-${reply.id}`} className="pt-3 pb-3 pl-6 ml-6 lg:ml-6">
                        <footer className="flex justify-between items-center">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900">{reply.name}</p>
                                <p className="text-sm text-gray-600">{formatFirestoreDate(reply.createdAt)}</p>
                            </div>
                        </footer>
                        <p className="mt-2">{reply.content}</p>
                    </article>
                ))
            }
            {!collapsedButton &&
                <div className="flex lg:ml-12">
                    <CustomTextarea id={`post-reply-${comment.id}`} width="w-3/4" callback={replyCallback} value={userReply} />
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

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch the list of blogs
    const blogs = await fetchBlogs()

    // Generate the paths based on the blog IDs
    const paths = blogs.map((blog) => ({
        params: { id: blog.id.toString() },
    }))

    return {
        paths,
        fallback: false,
    }
}
  
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params.id as string

    // Fetch the specific blog post based on the ID
    const blog: IPost = await fetchBlog(id)
    const likes: ILike[] = await fetchLikes(id)
    const comments: IComment[] = await fetchComments(id)

    return {
        props: {
            post: JSON.parse(JSON.stringify(blog)),
            likes: JSON.parse(JSON.stringify(likes)),
            comments: JSON.parse(JSON.stringify(comments)),
        },
    }
}

export default function Blog({ post, likes: postLikes, comments: postComments }: BProps) {
    const currentUser: User = useAuth()
    const [likes, setLikes] = useState<ILike[]>(postLikes)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState<IComment[]>(postComments)
    const [userComment, setUserComment] = useState('')
    const [shouldPrompt, setShouldPrompt] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (likes && currentUser) {
            const index = likes.findIndex(l => l.name === currentUser.email)
            setLiked(index !== -1)
        }
    }, [likes, currentUser])

    const commentCallback = (value: string) => {
        setUserComment(value)
    }

    const registerComment = async () => {
        if (userComment) {
            const newComment: IComment = {
                content: userComment,
                createdAt: new Date(),
                name: currentUser.displayName,
                postId: doc(db, "blogs", `${id}`)
            }
            putComment(newComment)
            setComments(prevComments => [...prevComments, { ...newComment }])
            setUserComment('')
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
                    setLikes(prevLikes => prevLikes.filter(l => l.name !== currentUser.email))
                }
            } else {
                const newLike: ILike = {
                    createdAt: new Date(),
                    name: currentUser.email,
                    postId: doc(db, "blogs", `${id}`)
                }
                const newId = await putLikeIfAbsent(newLike)
                if (newId) {
                    setLikes(prevLikes => [...prevLikes, { id: newId, ...newLike }])
                }
            }
            setLiked(prevIsLiked => !prevIsLiked)
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
                    <p className="mt-5">{new Date(post.createdAt).toDateString()} <span className="mr-2 ml-2">/</span> {calculateReadingTime(post.content)} minute read</p>
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
                        onBlur={() => setShouldPrompt(false)}
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
                    onMouseDown={() => login()}
                    >
                        login
                        </button> with your Google account.
                    </p>
                    : null }
                </div>
                </> : null
            }
            { comments ? 
                <>
                <div className="flex mt-w items-center">
                    <CustomTextarea id="post" width="w-full" callback={commentCallback} value={userComment} />
                    <button type="button"
                        className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2"
                        onClick={registerComment}
                        >
                        Post
                    </button>
                </div>
                { comments.sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                ).map(comment => <Comment key={comment.id} comment={comment} currentUser={currentUser} />)}
                </> : null
            }
        </>
    )
}