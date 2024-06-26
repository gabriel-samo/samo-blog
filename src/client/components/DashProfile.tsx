import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Button, FloatingLabel } from "flowbite-react";

function DashProfile() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]`}
          />
        </div>
        <FloatingLabel
          type="text"
          id="username"
          label="Username"
          variant="filled"
          defaultValue={currentUser?.username}
        />
        <FloatingLabel
          type="email"
          id="email"
          label="Email"
          variant="filled"
          defaultValue={currentUser?.email}
        />
        <FloatingLabel
          type="password"
          id="password"
          label="Password"
          variant="filled"
        />
        <Button
          type="button"
          className="w-full"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Update
        </Button>
      </form>
      <div className="text-red-500 mt-5 flex justify-between">
        <span className="cursor-pointer">Delete User</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
