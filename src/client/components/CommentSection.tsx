import SingleComment from "./SingleComment";

import { useAppSelector } from "../redux/hooks";
import { makeRequest } from "../utils/makeRequest";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommentModel } from "../models/comment.model";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  postId: string;
};

function CommentSection({ postId }: Props) {
  const { currentUser } = useAppSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const [postComments, setPostComments] = useState<CommentModel[]>([]);
  const [commentError, setCommentError] = useState<string | null>(null);
  const isDarkMode = useAppSelector((state) => state.theme.theme === "dark");
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setCommentError(null);
    makeRequest
      .get(`/api/comment/post-comments/${postId}`)
      .then((res) => {
        if (res.status === 200) {
          setPostComments(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentContent.length <= 0 || commentContent.length > 200) {
      setCommentError("Comment must be between 1 and 200 characters");
      return;
    }
    try {
      const res = await makeRequest.post(`/api/comment/create`, {
        postId,
        userId: currentUser?._id,
        content: commentContent
      });
      if (res.status === 201) {
        setPostComments((prev) => [res.data, ...prev]);
        setCommentContent("");
      }
    } catch (error: any) {
      console.log(error);
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    try {
      const res = await makeRequest.put(
        `/api/comment/like-comment/${commentId}`
      );
      if (res.status === 200) {
        setPostComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  numberOfLikes: res.data.likes.length
                }
              : comment
          )
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEdit = (comment: CommentModel, editedContent: string) => {
    setPostComments((prev) =>
      prev.map((item) =>
        item._id === comment._id ? { ...item, content: editedContent } : item
      )
    );
  };

  const handleDelete = async (commentId: string) => {
    setShowDeleteModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await makeRequest.delete(
        `/api/comment/delete-comment/${commentId}`
      );
      if (res.status === 200) {
        setPostComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="w-5 h-5 rounded-full"
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 text-cyan-500 text-sm my-5">
          You must be signed in to comment.
          <Link to={`/sign-in`} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border-2 border-teal-500 rounded-lg p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            required
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5 ">
            <p
              className={`text-xs text-gray-500 ${
                commentContent.length >= 200 ? "text-red-500" : ""
              }`}
            >
              {200 - commentContent.length} characters remaining
            </p>
            <Button gradientDuoTone="purpleToPink" type="submit" outline>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {postComments.length > 0 ? (
        <>
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{postComments.length}</p>
            </div>
          </div>
          {postComments.map((comment) => (
            <SingleComment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setCommentToDelete(commentId);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </>
      ) : (
        <p className="text-gray-500 text-sm my-5">No comments yet!</p>
      )}
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
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete!)}
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
    </div>
  );
}

export default CommentSection;
