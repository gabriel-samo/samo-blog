import moment from "moment";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { PostModel } from "../models/post.model";
import { makeRequest } from "../utils/makeRequest";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table, Toast } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashPosts() {
  const { currentUser } = useAppSelector((state) => state.user);
  const isDarkMode = useAppSelector((state) => state.theme.theme === "dark");
  const [userPosts, setUserPosts] = useState<PostModel[] | []>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const res = await makeRequest.get(
          `/api/post/all-posts?userId=${currentUser!._id}`
        );
        if (res.status === 200) {
          setUserPosts(res.data.posts);
          if (res.data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error: any) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    if (currentUser?.isAdmin) {
      getPosts();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    setLoading(true);
    try {
      const startIndex = userPosts.length;
      const res = await makeRequest.get(
        `/api/post/all-posts?userId=${
          currentUser!._id
        }&startIndex=${startIndex}`
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
    setLoading(false);
  };

  const handleDeletePost = async (postId: string) => {
    setLoading(true);
    setShowDeleteModal(false);
    try {
      const res = await makeRequest.delete(
        `/api/post/delete/${postId}/${currentUser!._id}`
      );
      if (res.status === 200) {
        setUserPosts(userPosts.filter((post) => post._id !== postId));
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" />
        </div>
      )}
      {error && <Toast color="red">Error while requesting the posts</Toast>}
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
                    <span
                      onClick={() => {
                        setShowDeleteModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
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
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl font-bold">No posts found</h2>
        </div>
      )}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          popup
          size="md"
          className={`${isDarkMode ? "dark" : ""}`}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => handleDeletePost(postIdToDelete!)}
                >
                  Yes I'm Sure
                </Button>
                <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default DashPosts;
