import React, { useEffect, useState } from "react";
import { UserModel } from "../models/user.model";
import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { makeRequest } from "../utils/makeRequest";
import { useAppSelector } from "../redux/hooks";
import {
  HiAnnotation,
  // HiArrowNarrowDown,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup
} from "react-icons/hi";
import { Avatar, Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

type UserData = {
  users: UserModel[];
  totalUsers: number;
  lastMonthUsers: number;
};

type PostData = {
  posts: PostModel[];
  totalPosts: number;
  lastMonthPosts: number;
};

type CommentData = {
  comments: CommentModel[];
  totalComments: number;
  lastMonthComments: number;
};

const DashboardComponents = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [usersData, setUsersData] = useState<UserData>({
    users: [],
    totalUsers: 0,
    lastMonthUsers: 0
  });
  const [postsData, setPostsData] = useState<PostData>({
    posts: [],
    totalPosts: 0,
    lastMonthPosts: 0
  });
  const [commentsData, setCommentsData] = useState<CommentData>({
    comments: [],
    totalComments: 0,
    lastMonthComments: 0
  });

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const users = await makeRequest.get("/api/user/all-users?limit=5");
        if (users.status === 200) {
          // data structure same as postsData state { users: [], totalUsers: 0, lastMonthUsers: 0 }
          setUsersData({ ...users.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    const fetchPostsData = async () => {
      try {
        const posts = await makeRequest.get("/api/post/all-posts?limit=5");
        if (posts.status === 200) {
          // data structure same as usersData State { posts: [], totalPosts: 0, lastMonthPosts: 0 }
          setPostsData({ ...posts.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    const fetchCommentsData = async () => {
      try {
        const comments = await makeRequest.get(
          "/api/comment/all-comments?limit=5"
        );
        if (comments.status === 200) {
          // data structure same as postsData State { comments: [], totalComments: 0, lastMonthComments: 0 }
          setCommentsData({ ...comments.data });
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsersData();
      fetchPostsData();
      fetchCommentsData();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      {/*=========================================== Users, Posts, Comments ===========================================*/}
      <div className="flex flex-wrap gap-4 justify-center">
        {/*=========================================== Users ===========================================*/}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{usersData.totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            {usersData.lastMonthUsers > 0 ? (
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {usersData.lastMonthUsers}
              </span>
            ) : (
              <span className="flex items-center">
                {usersData.lastMonthUsers}
              </span>
            )}
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        {/*=========================================== Posts ===========================================*/}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{postsData.totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            {postsData.lastMonthPosts > 0 ? (
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {postsData.lastMonthPosts}
              </span>
            ) : (
              <span className="flex items-center">
                {postsData.lastMonthPosts}
              </span>
            )}
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        {/*=========================================== Comments ===========================================*/}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{commentsData.totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            {commentsData.lastMonthComments > 0 ? (
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {commentsData.lastMonthComments}
              </span>
            ) : (
              <span className="flex items-center">
                {commentsData.lastMonthComments}
              </span>
            )}
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
      </div>
      {/*=========================================== Recent Users, Posts, Comments ===========================================*/}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {/*=========================================== Recent Users ===========================================*/}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2 className="text-center p-2">Recent Users</h2>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=users">View All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {usersData.users &&
                usersData.users.map((user) => (
                  <Table.Row
                    key={user._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <Avatar
                        rounded
                        alt={user.username}
                        img={user.profilePicture && user.profilePicture}
                        className="w-10 h-10 object-cover bg-gray-600 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/*=========================================== Recent Posts ===========================================*/}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2 className="text-center p-2">Recent Posts</h2>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=posts">View All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {postsData.posts &&
                postsData.posts.map((post) => (
                  <Table.Row
                    key={post._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <img
                        alt={post.title}
                        src={post.image && post.image}
                        className="w-14 h-10 object-cover bg-gray-500 rounded-md"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/*=========================================== Recent Comments ===========================================*/}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2 className="text-center p-2">Recent Comments</h2>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to="/dashboard?tab=comments">View All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {commentsData.comments &&
                commentsData.comments.map((comment) => (
                  <Table.Row
                    key={comment._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponents;
