import { PostModel } from "../models/post.model";
import { makeRequest } from "../utils/makeRequest";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import PostCard from "../components/PostCard";

type SearchParams = {
  searchTerm: string;
  sort: string;
  category: string;
};

function Search() {
  const [sidebarData, setSidebarData] = useState<SearchParams>({
    searchTerm: "",
    sort: "desc",
    category: ""
  });
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevState) => ({
        ...prevState,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || ""
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await makeRequest.get(`/api/post/all-posts?${searchQuery}`);
        if (res.status === 200) {
          setPosts(res.data.posts);
          setLoading(false);
          setShowMore(res.data.posts.length === 9 ? true : false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.id === "searchTerm") {
      setSidebarData((prevState) => ({
        ...prevState,
        searchTerm: e.target.value
      }));
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData((prevState) => ({
        ...prevState,
        sort: order
      }));
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSidebarData((prevState) => ({
        ...prevState,
        category: category
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await makeRequest.get(`/api/post/all-posts?${searchQuery}`);
    if (res.status === 200) {
      setPosts((prevState) => [...prevState, ...res.data.posts]);
      setShowMore(res.data.posts.length === 9 ? true : false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term:
            </Label>
            <TextInput
              id="searchTerm"
              type="text"
              placeholder="Search..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-semibold" htmlFor="sort">
              Sort:
            </Label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-semibold" htmlFor="category">
              Category:
            </Label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="">All</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nodejs">Node.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full ">
        <h2 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts Results:
        </h2>
        <div className="p-7 flex flex-wrap gap-4 justify-center">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="flex justify-center w-full">
              <Spinner size="xl" />
            </div>
          )}
          {!loading &&
            posts &&
            posts.length > 0 &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
