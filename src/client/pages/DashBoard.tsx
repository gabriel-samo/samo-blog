import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashComments from "../components/DashComments";
import DashboardComponents from "../components/DashboardComponents";

function DashBoard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<string | null>("");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    tabFromUrl && setTab(tabFromUrl);
  }, [searchParams.get("tab")]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="m:w-56">
        {/* Sidebar */}
        <DashSideBar />
      </div>
      {/* Dashboard Components */}
      {(tab === "dashboard" || !tab) && <DashboardComponents />}
      {/* Profile... */}
      {tab === "profile" && <DashProfile />}
      {/* Posts... */}
      {tab === "posts" && <DashPosts />}
      {/* Users... */}
      {tab === "users" && <DashUsers />}
      {/* Comments... */}
      {tab === "comments" && <DashComments />}
    </div>
  );
}

export default DashBoard;
