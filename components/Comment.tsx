import React, { useState, useCallback } from "react";
import { User } from "firebase/auth";
import CustomTextarea from "./CustomTextarea";
import { formatFirestoreDate } from "../utils/helpers";
import { putReply } from "../utils/api";

interface CommentProps {
  comment: IComment;
  currentUser: User | null;
}

export default function Comment({ comment, currentUser }: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [userReply, setUserReply] = useState("");
  const [replyAs, setReplyAs] = useState("");
  const [replies, setReplies] = useState<ICommentRoot[]>(comment.replies || []);

  const replyCallback = useCallback((value: string, name: string) => {
    setUserReply(value);
    setReplyAs(name);
  }, []);

  const registerReply = useCallback(async () => {
    if (!userReply) return;
    const userName = replyAs || currentUser?.displayName || "Anonymous";
    const newReply: ICommentRoot = {
      name: userName,
      content: userReply,
      createdAt: new Date(),
    };
    await putReply(comment.id, newReply);
    setReplies((prev) => [...prev, { ...newReply }]);
    setUserReply("");
    setShowReplyForm(false);
  }, [comment.id, currentUser, replyAs, userReply]);

  return (
    <article className="mt-8">
      <footer>
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900">
            {comment.name}
          </p>
          <p className="text-sm text-gray-600">
            {formatFirestoreDate(comment.createdAt)}
          </p>
        </div>
      </footer>
      <p className="mt-2 break-words whitespace-pre-line">{comment.content}</p>
      {replies.length > 0 && (
        <div className="flex mt-2 items-center duration-200">
          <button
            type="button"
            onClick={() => setShowReplies((prev) => !prev)}
            className="font-light text-sm px-2 py-1 ml-2"
          >
            <i
              className={`fas ${showReplies ? "fa-caret-down" : "fa-caret-right"} mr-2`}
            />
            Replies
          </button>
        </div>
      )}
      {showReplies &&
        replies
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((reply, idx) => (
            <article
              key={reply.id || `${comment.id}-reply-${idx}`}
              className="pt-3 pb-3 pl-6 ml-6 lg:ml-6"
            >
              <footer className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                    {reply.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatFirestoreDate(reply.createdAt)}
                  </p>
                </div>
              </footer>
              <p className="mt-2 break-words whitespace-pre-line">
                {reply.content}
              </p>
            </article>
          ))}
      {showReplyForm && (
        <div className="flex lg:ml-12">
          <CustomTextarea
            id={`post-reply-${comment.id}`}
            width="w-3/4"
            callback={replyCallback}
            value={userReply}
          />
          <div className="flex mt-4 items-center w-1/4">
            <button
              type="button"
              className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2"
              onClick={registerReply}
            >
              Post Reply
            </button>
          </div>
        </div>
      )}
      <div className="flex mt-2 items-center">
        <button
          type="button"
          onClick={() => setShowReplyForm((prev) => !prev)}
          className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm px-4 py-2 duration-300 rounded-full ml-2"
        >
          Reply
        </button>
      </div>
    </article>
  );
}
