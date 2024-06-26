import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";

function DashSideBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<string | null>("");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    tabFromUrl && setTab(tabFromUrl);
  }, [searchParams.get("tab")]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <NavLink to="/dashboard?tab=profile">
            <Sidebar.Item
              className="cursor-pointer"
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </NavLink>
          <Sidebar.Item
            className="cursor-pointer"
            icon={HiArrowSmRight}
            as="div"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSideBar;
