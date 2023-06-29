import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from './../firebase/clientApp'

// ========= Blogs ========= //

export const fetchBlogs = async () => {
    const response  = await getDocs(collection(db, "blogs"))
    return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const fetchBlog = async (id) => {
    const q = doc(db, "blogs", `${id}`)
    const response  = await getDoc(q)
    if (response.exists) {
        return response.data()
    }
}
