import { Alert, Button, FloatingLabel, Spinner } from "flowbite-react";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../utils/makeRequest";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  signInFailure,
  signInStart,
  signInSuccess
} from "../redux/slices/userSlice";
import OAuth from "../components/OAuth";

type userCreds = {
  email: string;
  password: string;
};

function SignIn() {
  const [formData, setFormData] = useState<userCreds | null>(null);
  const { loading, errorMsg } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData && formData.email.trim();
    formData && formData.password.trim();
    if (!formData || !formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fileds"));
    }
    try {
      dispatch(signInStart());
      const result = await makeRequest.post("/api/auth/signin", formData);
      if (result.status !== 200) {
        console.log(result.data);
        return dispatch(signInFailure(result.data.message));
      }
      if (result.status === 200) {
        dispatch(signInSuccess(result.data));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      dispatch(signInFailure(error.response.data.message));
    }
  };
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FloatingLabel
              variant="filled"
              label="Email"
              type="email"
              id="email"
              onChange={handleChange}
            />
            <FloatingLabel
              variant="filled"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sing In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <NavLink to="/sign-up" className="text-blue-500">
              Sign Up
            </NavLink>
          </div>
          {errorMsg && (
            <Alert className="mt-5" color="failure">
              {errorMsg}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
