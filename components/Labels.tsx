import React from "react";
import Link from "next/link";

interface Label {
  id: string;
  name: string;
}

interface LabelsProps {
  labels: Label[];
}

export default function Labels({ labels }: LabelsProps) {
  if (!labels?.length) return null;
  return (
    <div className="flex flex-wrap items-center mt-12">
      <span className="mr-2">Labels:</span>
      {labels.map((label) => (
        <span
          key={label.id}
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs text-center duration-200 rounded-full p-2 mr-1"
        >
          <Link href={`/blog/labels/${label.id}`}>{label.name}</Link>
        </span>
      ))}
    </div>
  );
}
