import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import TagsInput from "react-tagsinput";
import Custom404 from "./404";
import { useAuth } from "../utils/authHandler";
import { fetchTags, putBlog } from "../utils/api";

import "react-tagsinput/react-tagsinput.css";

export default function Admin() {
  const user = useAuth();
  const editorRef = useRef(null);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data.map((tag) => tag.name));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getTags();
  }, []);

  const createPost = async () => {
    if (editorRef.current && title && tags.length > 0) {
      const content = editorRef.current.getContent();
      try {
        putBlog(title, "Sanchay Javeria", content, tags).then((blogId) => {
          // email subscribers
          fetch("/api/mail", {
            method: "POST",
            body: JSON.stringify({
              id: blogId,
              title,
              content,
              tags,
            }),
          });
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-alert
        alert(error);
      } finally {
        // eslint-disable-next-line no-alert
        alert("Post created successfully!");
        setTitle("");
        editorRef.current.setContent("");
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("Title, content and tags are required.");
    }
  };

  const handleTags = (names: string[]) => {
    setTags(names);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const notepad: JSX.Element = (
    <div className="container flex flex-col items-center mx-auto mt-16 max-w-7xl px-8 py-12">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleInputChange}
        autoComplete="off"
        value={title}
        id="username"
        type="text"
        placeholder="Post Title"
      />
      <div className="w-full py-2">
        <Editor
          id="editor"
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onInit={(e, editor) => {
            editorRef.current = editor;
          }}
          init={{
            plugins:
              "codesample anchor autolink link lists image code advcode mergetags wordcount",
            toolbar:
              "undo redo | blocks | bold italic strikethrough backcolor | mergetags | link image | align bullist numlist | codesample code",
            height: 900,
            codesample_languages: [
              { text: "HTML/XML", value: "markup" },
              { text: "JavaScript", value: "javascript" },
              { text: "CSS", value: "css" },
              { text: "Python", value: "python" },
              { text: "Java", value: "java" },
              { text: "C", value: "c" },
              { text: "Scala", value: "scala" },
            ],
          }}
        />
        <div className="mt-2 px-2 rounded border-b border-gray-300 shadow focus:border-gray-600">
          <TagsInput className="" value={tags} onChange={handleTags} />
        </div>
      </div>
      <button
        className="font-light bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm mt-2 px-4 py-2 duration-300 rounded-full"
        type="button"
        onClick={createPost}
      >
        Submit
      </button>
    </div>
  );

  if (user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return notepad;
  }

  return (
    <div className="mx-auto max-w-7xl px-8 py-12 lg:pt-24">
      <Custom404 />
    </div>
  );
}
