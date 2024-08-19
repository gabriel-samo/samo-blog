import moment from "moment";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { UserModel } from "../models/user.model";
import { makeRequest } from "../utils/makeRequest";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, Spinner, Table, Toast } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

function DashUsers() {
  const { currentUser } = useAppSelector((state) => state.user);
  const isDarkMode = useAppSelector((state) => state.theme.theme === "dark");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [users, setUsers] = useState<UserModel[] | []>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await makeRequest.get(`/api/user/all-users`);
        if (res.status === 200) {
          setUsers(res.data.users);
          if (res.data.users.length < 9) {
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
      getUsers();
    }
  }, []);

  const handleShowMore = async () => {
    setLoading(true);
    try {
      const startIndex = users.length;
      const res = await makeRequest.get(
        `/api/user/all-users?startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users]);
        if (res.data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.delete(
        `/api/user/delete/${userIdToDelete}`
      );
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== userIdToDelete));
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
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar
                      rounded
                      alt={user.username}
                      img={user.profilePicture && user.profilePicture}
                      className="w-20 h-10 object-cover bg-gray-00"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowDeleteModal(true);
                        setUserIdToDelete(user._id);
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
          <h2 className="text-2xl font-bold">No users found</h2>
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
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
