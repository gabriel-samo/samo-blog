import React, { useEffect, useState } from "react";
import { CommentModel } from "../models/comment.model";
import { makeRequest } from "../utils/makeRequest";
import { UserModel } from "../models/user.model";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";

type Props = {
  comment: CommentModel;
  onLike: (commentId: string) => void;
};

const SingleComment = ({ comment, onLike }: Props) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    makeRequest
      .get(`/api/user/${comment.userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.profilePicture}
          alt={user?.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1">
          <span className="font-bold my-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex items-center pt-2 test-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            className={`transition-all hover:text-blue-500 ${
              comment.likes.includes(currentUser?._id!)
                ? "text-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              `${comment.numberOfLikes} ${
                comment.numberOfLikes === 1 ? "like" : "likes"
              }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
