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
    <button
      type="button"
      onClick={onClick}
      onBlur={onBlur}
      className={`transition-colors duration-300 flex items-center ${liked ? "text-black font-medium" : ""}`}
      tabIndex={0}
    >
      <i
        className={`${liked ? "fas" : "far"} fa-thumbs-up mr-2`}
        aria-hidden="true"
      />
      <span>Like</span>
      {count > 0 && <span className="ml-2">{count} like(s)</span>}
    </button>
  );
}
