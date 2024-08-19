import moment from "moment";
import { useAppSelector } from "../redux/hooks";
import React, { useEffect, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { CommentModel } from "../models/comment.model";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal, Spinner, Table, Toast } from "flowbite-react";

const DashComments = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const isDarkMode = useAppSelector((state) => state.theme.theme === "dark");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [comments, setComments] = useState<CommentModel[] | []>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getComments = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await makeRequest.get(`/api/comment/all-comments`);
        if (res.status === 200) {
          setComments(res.data.comments);
          if (res.data.comments.length < 9) {
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
      getComments();
    }
  }, []);

  const handleShowMore = async () => {
    setLoading(true);
    try {
      const startIndex = comments.length;
      const res = await makeRequest.get(
        `/api/comment/get-comments?startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setComments((prev) => [...prev, ...res.data.comments]);
        if (res.data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeleteComment = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.delete(
        `/api/comment/delete-comment/${commentIdToDelete}`
      );
      if (res.status === 200) {
        setComments(
          comments.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowDeleteModal(false);
      } else {
        setShowDeleteModal(false);
        console.log(res.data.message);
      }
    } catch (error: any) {
      setError(true);
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
      {error && (
        <Toast color="red" duration={1000}>
          Error while requesting the users
        </Toast>
      )}
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>Post ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {moment(comment.updatedAt).format("DD/MM/YYYY")}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowDeleteModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
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
          <h2 className="text-2xl font-bold">No comments found</h2>
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
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteComment}>
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
};

export default DashComments;
