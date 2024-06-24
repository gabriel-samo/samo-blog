import React from "react";
import { Button, FloatingLabel } from "flowbite-react";
import { NavLink } from "react-router-dom";

function SignIn() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <NavLink to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white">
              Samo's
            </span>
            Blog
          </NavLink>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <FloatingLabel
              variant="filled"
              label="Email"
              type="email"
              id="email"
            />
            <FloatingLabel
              variant="filled"
              label="Password"
              type="password"
              id="password"
            />
            <Button type="submit" gradientDuoTone="purpleToBlue">
              Sign In
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <NavLink to="/sign-up" className="text-blue-500">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
