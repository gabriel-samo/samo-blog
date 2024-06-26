import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { makeRequest } from "../utils/makeRequest";
import { signout } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hooks";

function DashSideBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<string | null>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    tabFromUrl && setTab(tabFromUrl);
  }, [searchParams.get("tab")]);

  const handleSignout = async () => {
    try {
      const res = await makeRequest.post("api/user/signout");
      if (res.status !== 200) {
        console.log(res.data.messgae);
      } else {
        dispatch(signout());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Sidebar.Item
            className="cursor-pointer"
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            as={NavLink}
            to="/dashboard?tab=profile"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            className="cursor-pointer"
            icon={HiArrowSmRight}
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSideBar;
