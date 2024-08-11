import React, { useEffect, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useAppSelector } from "../redux/hooks";
import { PostModel } from "../models/post.model";
import { Table } from "flowbite-react";
import moment from "moment";
import { Link } from "react-router-dom";

function DashPosts() {
  const { currentUser } = useAppSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState<PostModel[] | []>([]);
  const [showMore, setShowMore] = useState(true);
  // console.log(userPosts);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await makeRequest.get(
          `/api/post/allPosts?userId=${currentUser!._id}`
        );
        if (res.status === 200) {
          setUserPosts(res.data.posts);
          if (res.data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    if (currentUser?.isAdmin) {
      getPosts();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    try {
      const startIndex = userPosts.length;
      const res = await makeRequest.get(
        `/api/post/allPosts?userId=${currentUser!._id}&startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setUserPosts((prev) => [...prev, ...res.data.posts]);
        if (res.data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {userPosts.map((post) => (
                <Table.Row
                  key={post._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {moment(post.updatedAt).format("DD/MM/YYYY")}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-00"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm p-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}

export default DashPosts;
