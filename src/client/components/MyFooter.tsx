import React from "react";
import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsGithub,
  BsYoutube
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";

function MyFooter() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <NavLink
              to="/"
              className="flex gap-2 whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <div className="flex items-center relative">
                <span>SAMO</span>
              </div>
              <div className="flex items-center">
                <span>BL</span>
                <FiMessageCircle className="mt-[0.2rem]" />
                <span>G</span>
              </div>
            </NavLink>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  My Website
                </Footer.Link>
                <Footer.Link href="#">About Me</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/gabriel-samo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/gabriel-samoylov-7262aa22a/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Gabriel's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://github.com/gabriel-samo"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/gabriel-samoylov-7262aa22a/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://www.youtube.com/channel/UCgrN-oQ5bXDf4kYtOaTjejA"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsYoutube}
            />
            <Footer.Icon
              href="https://www.facebook.com/gabi.samoylov"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/gabisamoylov/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsInstagram}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default MyFooter;
