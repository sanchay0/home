import React from "react";

interface LikeButtonProps {
  liked: boolean;
  count: number;
  onClick: () => void;
  onBlur: () => void;
}

export default function LikeButton({
  liked,
  count,
  onClick,
  onBlur,
}: LikeButtonProps) {
  return (
    <div className="flex items-center">
      <span>{count > 0 ? `${count} like(s)` : null}</span>
      <span className="mr-2 ml-2">{count > 0 ? "•" : null}</span>
      <button
        type="button"
        className={`transition-colors duration-300 ${liked ? "text-black font-medium" : ""}`}
        onClick={onClick}
        tabIndex={0}
        onBlur={onBlur}
      >
        <i
          className={`${liked ? "fas" : "far"} fa-thumbs-up mr-2`}
          aria-hidden="true"
        />
        <span>Like</span>
      </button>
    </div>
  );
}
