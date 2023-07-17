import { DocumentReference, collection, addDoc, doc, getDoc, getDocs, deleteDoc, query, where, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from "../firebase/clientApp"

// ========= Blogs ========= //

export async function fetchBlogs(): Promise<IPost[]> {
    const response  = await getDocs(collection(db, "blogs"))
    const posts = await Promise.all(
        response.docs.map(async (post) => {
            const data = post.data()
            const tagRefs: DocumentReference[] = data.tags
            let tags: ITag[]

            if (tagRefs) {
                const tagPromises = tagRefs.map(async (ref) => {
                    const tag = await getDoc(ref)
                    if (tag.exists()) {
                        const tagData = tag.data()
                        return {
                            id: tag.id,
                            name: tagData.name,
                        }
                    }
                    throw new Error('Tag does not exist.')
                })
                tags = await Promise.all(tagPromises)
            }
            return {
                id: post.id,
                title: data.title,
                author: data.author,
                content: data.content,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
                tags,
            }
        }
    ))

    return posts
}

export async function fetchBlogsByTag(tagId: string): Promise<IPost[]> {
    const q = doc(db, "tags", `${tagId}`)
    const response = await getDoc(q)
    const blogRefs: DocumentReference[] = response.data().blogs
    let blogs: IPost[]

    if (blogRefs) {
        const blogPromises = blogRefs.map(async (ref) => {
            const blog = await getDoc(ref)
            if (blog.exists()) {
                const data = blog.data()
                return {
                    id: `${blog.id}`,
                    title: data.title,
                    author: data.author,
                    content: data.content,
                    createdAt: data.createdAt.toDate(),
                    updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
                }
            }
            throw new Error(`Blog does not exist.`)
        })
        blogs = await Promise.all(blogPromises)
        return blogs
    }
    throw new Error(`Tag ID ${tagId} does not have any blogs.`)
}

export async function fetchBlog(id: string): Promise<IPost> {
    const q = doc(db, "blogs", id)
    const response = await getDoc(q)
    let tags: ITag[]

    if (response.exists()) {
        const data = response.data()
        const tagRefs: DocumentReference[] = data.tags
        if (tagRefs) {
            const tagPromises = tagRefs.map(async (ref) => {
                const tag = await getDoc(ref)
                if (tag.exists()) {
                    return {
                    id: tag.id,
                    name: tag.data().name,
                    }
                }
                throw new Error(`Tag does not exist.`)
            })
            tags = await Promise.all(tagPromises)
        }

        const mappedData: IPost = {
            id,
            title: data.title,
            author: data.author,
            content: data.content,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
            tags,
        }
        return mappedData
    }

    throw new Error(`Blog with ID ${id} does not exist.`)
}

export async function putBlog(title: string, author: string, content: string, tagNames: string[]): Promise<void> {
    const postDocRef = await addDoc(collection(db, "blogs"), {
        title,
        author,
        content,
        createdAt: new Date(),
    })

    // Get the document reference for each tag
    const tagRefs = await Promise.all(
        tagNames.map(async (tagName) => {
            const querySnapshot = await getDocs(query(collection(db, "tags"), where('name', '==', tagName)))
            if (!querySnapshot.empty) {
                const tagDoc = querySnapshot.docs[0]
                const tagRef = doc(db, "tags", tagDoc.id)

                await updateDoc(tagRef, {
                    blogs: arrayUnion(postDocRef)
                })

                return tagRef
            }
            // Create the tag if it doesn't exist
            const newTagDocRef = await addDoc(collection(db, "tags"), {
                name: tagName,
                blogs: [postDocRef],
            })
            return doc(db, "tags", newTagDocRef.id)
        })
    )

    // Update the 'tags' field of the post with the tag document references
    await updateDoc(postDocRef, {
        tags: tagRefs,
    })
}

// ========= Likes ========= //

export async function fetchLikes(blogId: string): Promise<ILike[]> {
    const likesRef = collection(db, "likes")
    const blogRef = doc(db, "blogs", `${blogId}`)
    const q = query(likesRef, where("postId", "==", blogRef))
    const response = await getDocs(q)
    const likes = response.docs.map((like) => {
        const data = like.data()
        return {
            id: like.id,
            createdAt: (data.createdAt.toDate()).getTime(),
            name: data.name,
            postId: blogRef,
        }
    })

    return likes
}

export async function putLikeIfAbsent(like: ILike): Promise<string | void> {
    const likeRef = collection(db, "likes")
    const q = query(likeRef,
        where("postId", "==", like.postId),
        where("name", "==", like.name))
    const response = await getDocs(q)
    if (response.empty) {
        const docRef = await addDoc(collection(db, "likes"), like)
        return docRef.id
    }
    return Promise.resolve()
}

export async function deleteLike(id: string): Promise<void> {
    await deleteDoc(doc(db, "likes", id))
}

// ========= Comments ========= //

export async function fetchComments(blogId: string): Promise<IComment[]> {
    const commentsRef = collection(db, "comments")
    const blogRef = doc(db, "blogs", `${blogId}`)
    const q = query(commentsRef, where("postId", "==", blogRef))
    const response = await getDocs(q)

    const comments = await Promise.all(
        response.docs.map(async (comment) => {
            const repliesRef = collection(comment.ref, "replies")
            const repliesSnapshot = await getDocs(repliesRef)
            const replies: ICommentRoot[] = repliesSnapshot.docs.map((replyDoc) => ({
                id: replyDoc.id,
                name: replyDoc.data().name,
                content: replyDoc.data().content,
                createdAt: (replyDoc.data().createdAt.toDate()).getTime(),
            }))
            const data = comment.data()
            return {
                id: comment.id,
                name: data.name,
                content: data.content,
                createdAt: (data.createdAt.toDate()).getTime(),
                replies,
                postId: blogRef,
            }
    }))

    return comments
}

export async function putComment(comment: IComment): Promise<void> {
    await addDoc(collection(db, "comments"), comment)
}

export async function putReply(commentId: string, reply: ICommentRoot): Promise<void> {
    const commentRef = doc(db, "comments", commentId)
    const replyRef = collection(commentRef, "replies")
    await addDoc(replyRef, reply)
}

// ========= Tags ========= //

export async function fetchTags(): Promise<ITag[]> {
    const response  = await getDocs(collection(db, "tags"))
    const tags = response.docs.map((tag) => {
        const data = tag.data()
        return {
            id: tag.id,
            name: data.name,
            blogs: data.blogs,
        }
      })

    return tags
}

export async function fetchTag(tagId: string): Promise<ITag> {
    const q = doc(db, "tags", `${tagId}`)
    const response = await getDoc(q)
    
    if (response.exists()) {
        const data = response.data()

        return {
            id: response.id,
            name: data.name,
            blogs: data.blogs,
        }
    }
    throw new Error(`Tag with ${tagId} does not exist.`)
}

// ========= Subscribers ========= //

export async function putSubscriberIfAbsent(subscriber: ISubscriber) {
    const subscriberRef = collection(db, "subscribers")
    const q = query(subscriberRef, where("email", "==", subscriber.email))
    const response = await getDocs(q)
    if (response.empty) {
        await addDoc(collection(db, "subscribers"), subscriber)
    }
}