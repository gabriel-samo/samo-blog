import { Link } from "react-router-dom";
import { PostModel } from "../models/post.model";
import { makeRequest } from "../utils/makeRequest";
import React, { useEffect, useState } from "react";

import CallToActions from "../components/CallToActions";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    makeRequest
      .get("/api/post/all-posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my blog</h1>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-xs sm:text-sm">
            Here you will find a variety of articles and tutorials on web
            development, software engineering and programming languages
            (JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB,
            etc.).
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            I will be sharing my knowledge and experience with you, and I hope
            you will find it helpful.
          </p>
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToActions />
      </div>
      <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 font-bold hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
