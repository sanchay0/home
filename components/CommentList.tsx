import React from "react";
import { User } from "firebase/auth";
import Comment from "./Comment";

interface CommentListProps {
  comments: IComment[];
  currentUser: User | null;
}

export default function CommentList({
  comments,
  currentUser,
}: CommentListProps) {
  if (!comments || comments.length === 0) return null;

  return (
    <>
      {comments
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
    </>
  );
}
