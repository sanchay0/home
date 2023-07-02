import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from "../firebase/clientApp"

// ========= Blogs ========= //

export async function fetchBlogs(): Promise<IPost[]> {
    const response  = await getDocs(collection(db, "blogs"))
    const posts = response.docs.map((post) => {
        const data = post.data()
        return {
          id: post.id,
          title: data.title,
          author: data.author,
          content: data.content,
          created_at: data.created_at.toDate(),
          updated_at: data.updated_at ? data.updated_at.toDate() : undefined,
        }
      })
    
      return posts
}

export async function fetchBlog(id: string | string[]): Promise<IPost> {
    const q = doc(db, "blogs", `${id}`)
    const response = await getDoc(q)

    if (response.exists) {
        const data = response.data()
        const mappedData: IPost = {
            id: `${id}`,
            title: data.title,
            author: data.author,
            content: data.content,
            created_at: data.created_at.toDate(),
            updated_at: data.updated_at ? data.updated_at.toDate() : undefined,
            // TODO: fetch tags
        }
        return mappedData
    }
    throw new Error(`Blog with ID ${id} does not exist.`)
    
}

// ========= Likes ========= //

export async function fetchLikes(blogId: string | string[]): Promise<ILike[]> {
    const likesRef = collection(db, "likes")
    const blogRef = doc(db, "blogs", `${blogId}`)
    const q = query(likesRef, where("post_id", "==", blogRef))
    const response = await getDocs(q)
    const likes = response.docs.map((like) => {
        const data = like.data()
        return {
            time: (data.created_at.toDate()).getTime(),
            name: data.name,
        }
    })

    return likes
}

// ========= Comments ========= //

export async function fetchComments(blogId: string | string[]): Promise<IComment[]> {
    const commentsRef = collection(db, "comments")
    const blogRef = doc(db, "blogs", `${blogId}`)
    const q = query(commentsRef, where("post_id", "==", blogRef))
    const response = await getDocs(q)

    const comments = await Promise.all(
        response.docs.map(async (comment) => {
            const repliesRef = collection(comment.ref, "replies")
            const repliesSnapshot = await getDocs(repliesRef)
            const replies: ICommentRoot[] = repliesSnapshot.docs.map((replyDoc) => ({
                id: replyDoc.id,
                name: replyDoc.data().name,
                content: replyDoc.data().content,
                time: (replyDoc.data().created_at.toDate()).getTime(),
            }))
            const data = comment.data()
            return {
                id: comment.id,
                name: data.name,
                content: data.content,
                time: (data.created_at.toDate()).getTime(),
                replies,
            }
    }))

    return comments
}
