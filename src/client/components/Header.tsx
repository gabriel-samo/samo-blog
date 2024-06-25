import React from "react";
import { FaMoon } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useAppSelector } from "../redux/hooks";

function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <Navbar className="border-b-2">
      <NavLink
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white">
          Samo's
        </span>
        Blog
      </NavLink>
      <form className="flex gap-4">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-9 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
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
            <Dropdown.Item>Sign out</Dropdown.Item>
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

export default Header;
