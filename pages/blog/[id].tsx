import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import {
  deleteLike,
  fetchBlog,
  fetchBlogs,
  fetchComments,
  fetchLikes,
  putLikeIfAbsent,
  putComment,
} from "../../utils/api";
import { calculateReadingTime } from "../../utils/helpers";
import { login, useAuth } from "../../utils/authHandler";
import LikeButton from "../../components/LikeButton";
import Labels from "../../components/Labels";
import CommentList from "../../components/CommentList";
import CustomTextarea from "../../components/CustomTextarea";
import EmailSubscriptionForm from "../../components/EmailSubscriptionForm";

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await fetchBlogs();
  const paths = blogs.map((blog) => ({
    params: { id: blog.id.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string;
  const blog: IPost = await fetchBlog(id);
  const likes: ILike[] = await fetchLikes(id);
  const comments: IComment[] = await fetchComments(id);

  return {
    props: {
      post: JSON.parse(JSON.stringify(blog)),
      likes: JSON.parse(JSON.stringify(likes)),
      comments: JSON.parse(JSON.stringify(comments)),
    },
    revalidate: 5,
  };
};

export default function Blog({
  post,
  likes: initialLikes,
  comments: initialComments,
}: {
  post: IPost;
  likes: ILike[];
  comments: IComment[];
}) {
  const currentUser = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [userComment, setUserComment] = useState("");
  const [commentAs, setCommentAs] = useState("");
  const [shouldPrompt, setShouldPrompt] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (likes && currentUser) {
      setLiked(likes.some((l) => l.name === currentUser.email));
    }
  }, [likes, currentUser]);

  const commentCallback = useCallback((value: string, name: string) => {
    setUserComment(value);
    setCommentAs(name);
  }, []);

  const registerComment = useCallback(async () => {
    if (userComment && currentUser) {
      const newComment: IComment = {
        content: userComment,
        createdAt: new Date(),
        name: commentAs || currentUser.displayName || "Anonymous",
        postId: doc(db, "blogs", `${id}`),
      };
      await putComment(newComment);
      setComments((prev) => [...prev, { ...newComment }]);
      setUserComment("");
    }
  }, [userComment, currentUser, commentAs, id]);

  const registerLike = useCallback(async () => {
    if (currentUser) {
      setShouldPrompt(false);
      if (liked) {
        const like = likes.find((l) => l.name === currentUser.email);
        if (like) {
          await deleteLike(like.id);
          setLikes((prev) => prev.filter((l) => l.name !== currentUser.email));
        }
      } else {
        const newLike: ILike = {
          createdAt: new Date(),
          name: currentUser.email,
          postId: doc(db, "blogs", `${id}`),
        };
        const newId = await putLikeIfAbsent(newLike);
        if (newId) {
          setLikes((prev) => [...prev, { id: newId, ...newLike }]);
        }
      }
      setLiked((prev) => !prev);
    } else {
      setShouldPrompt((prev) => !prev);
    }
  }, [currentUser, liked, likes, id]);

  const sumReplies = comments.reduce(
    (acc, comment) => acc + (comment.replies?.length || 0),
    0,
  );
  const totalComments = comments.length + sumReplies;

  return (
    <>
      <Head>
        <title>{post ? post.title : "Blog post"}</title>
      </Head>
      {post && (
        <div className="font-light text-sm mt-16">
          <p className="text-black">{post.title}</p>
          <p className="mt-5 italic">
            {new Date(post.createdAt).toDateString()}
            <span className="mx-2">/</span>
            {calculateReadingTime(post.content)} minute read
          </p>
          <div className="mt-5 space-y-3 break-words">
            <div
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      )}

      <Labels labels={post?.tags ?? []} />

      <div className="space-y-3 mt-8">
        <div className="flex justify-between items-center">
          <span>
            {totalComments > 0 ? `${totalComments} comment(s)` : null}
          </span>
          <LikeButton
            liked={liked}
            count={likes.length}
            onClick={registerLike}
            onBlur={() => setShouldPrompt(false)}
          />
        </div>
        <CommentList comments={comments} currentUser={currentUser} />
        <div className="text-center flex justify-end">
          {shouldPrompt && (
            <p className="text-xs">
              To avoid spam, please{" "}
              <button
                type="button"
                className="font-normal text-black items-center duration-200 hover:no-underline underline"
                onMouseDown={() => login()}
              >
                login
              </button>{" "}
              with your Google account.
            </p>
          )}
        </div>
        <div className="flex items-center">
          <CustomTextarea
            id="post"
            width="w-full"
            callback={commentCallback}
            value={userComment}
          />
          <button
            type="button"
            className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2"
            onClick={registerComment}
          >
            Post
          </button>
        </div>
      </div>
      <div className="mt-20">
        <EmailSubscriptionForm />
      </div>
    </>
  );
}
