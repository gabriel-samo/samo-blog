import React, { useEffect, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useAppSelector } from "../redux/hooks";
import { PostModel } from "../models/post.model";
import { Table } from "flowbite-react";
import moment from "moment";
import { Link } from "react-router-dom";

function DashPosts() {
  return <div>DashPosts</div>;
}

export default DashPosts;
