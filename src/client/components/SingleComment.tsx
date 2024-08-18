import React, { useEffect, useState } from "react";
import { CommentModel } from "../models/comment.model";
import { makeRequest } from "../utils/makeRequest";
import { UserModel } from "../models/user.model";
import moment from "moment";

type Props = {
  comment: CommentModel;
};

const SingleComment = ({ comment }: Props) => {
  const [user, setUser] = useState<UserModel | null>(null);

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
      </div>
    </div>
  );
};

export default SingleComment;
