import moment from "moment";
import PostCard from "../components/PostCard";
import HTMLReactParser from "html-react-parser";
import CallToActions from "../components/CallToActions";
import CommentSection from "../components/CommentSection";

import { PostModel } from "../models/post.model";
import { makeRequest } from "../utils/makeRequest";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner, Toast } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";

function PostPage() {
  const { postSlug } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostModel | null>(null);
  const [recentPosts, setRecentPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    setLoading(true);
    makeRequest
      .get(`/api/post/all-posts?slug=${postSlug}`)
      .then((res) => {
        if (res.status === 200) {
          setPost(res.data.posts[0]);
        } else {
          setError(true);
          return;
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postSlug]);

  useEffect(() => {
    makeRequest
      .get(`/api/post/all-posts?limit=3`)
      .then((res) => {
        if (res.status === 200) {
          setRecentPosts(res.data.posts);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  const postContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      const preTags = postContentRef.current?.querySelectorAll("pre");
      preTags?.forEach((pre: Element) => {
        // Save the original text content:
        const oldContent = pre.textContent;
        // Split the text on a line break:
        const oldContentArray = oldContent?.split("\n");
        // Remove the first two lines of the code block:
        oldContentArray?.shift();
        oldContentArray?.shift();
        // Join the remaining lines with a line break:
        const newTextContent = oldContentArray?.join("\n");
        // Set the new text content:
        pre.textContent = newTextContent || "";
        // Add div with button to the top of the code block:
        const div = document.createElement("div");
        div.className = "relative flex items-center w-full text-xs";
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.className =
          "absolute right-0 top-0 p-1 rounded-md bg-slate-600 hover:bg-slate-700";
        // When the button is clicked, copy the text to the clipboard:
        button.onclick = () => {
          navigator.clipboard.writeText(newTextContent || "").then(() => {
            // Change the button text to "Copied" and add a checkmark:
            button.innerHTML = "Copied <span class='text-green-500'>✔</span>";
            // Change the button text back to "Copy" after 2 seconds:
            setTimeout(() => {
              button.innerText = "Copy";
            }, 2000);
          });
        };
        // Add the button to the div:
        div.appendChild(button);
        // Add the div to the top of the code block:
        pre.prepend(div);
      });
    }
  }, [post]);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" className="mx-auto" />
        </div>
      )}
      {error && (
        <Toast color="red" duration={1000}>
          Error while requesting the post
        </Toast>
      )}
      {post && (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post.image}
            alt={post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover rounded-3xl"
          />
          <div className="flex justify-between p-3 border-b-2 border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{post && moment(post.createdAt).format("DD/MM/YYYY")}</span>
            <span className="italic">
              {post && Math.round(post.content.length / 1000)} mins read
            </span>
          </div>
          <div
            ref={postContentRef}
            className="p-3 max-w-2xl mx-auto w-full post-content"
            // dangerouslySetInnerHTML={{ __html: post.content }}
          >
            {HTMLReactParser(post.content)}
          </div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToActions />
          </div>
          <CommentSection postId={post._id} />
          <div className="flex flex-col justify-center items-center mb-5">
            <h2 className="text-xl mt-5">Recent Articles</h2>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {recentPosts &&
                recentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default PostPage;
