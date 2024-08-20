import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FiMessageCircle, FiSun } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/slices/themeSlice";
import { makeRequest } from "../utils/makeRequest";
import { signout } from "../redux/slices/userSlice";

function MyHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useAppSelector((state) => state.theme);
  const { currentUser } = useAppSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromUrl = searchParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2">
      <NavLink
        to="/"
        className="flex gap-2 whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <div className="flex items-center">
          <span>SAMO</span>
        </div>
        <div className="flex items-center">
          <span>BL</span>
          <FiMessageCircle className="mt-[0.2rem]" />
          <span>G</span>
        </div>
      </NavLink>
      <form className="flex gap-4 lg:inline" onSubmit={handleSearchSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className="w-12 h-9 lg:hidden"
        color="gray"
        pill
        onClick={() => navigate("/search")}
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={handleThemeToggle}
        >
          {theme === "light" ? <FaMoon /> : <FiSun className="text-white" />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                alt="user picture"
                img={currentUser.profilePicture && currentUser.profilePicture}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <NavLink to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </NavLink>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <NavLink to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </NavLink>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={NavLink} to="/" active={path === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/about" active={path === "/about"}>
          About
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/projects" active={path === "/projects"}>
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyHeader;
