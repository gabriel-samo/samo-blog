import { Alert, Button, FloatingLabel, Spinner } from "flowbite-react";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../utils/makeRequest";
import OAuth from "../components/OAuth";

type userCreds = {
  username: string;
  email: string;
  password: string;
};

function SignUp() {
  const [formData, setFormData] = useState<userCreds | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData && formData.email.trim();
    formData && formData.password.trim();
    formData && formData.username.trim();
    if (
      !formData ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      return setErrorMsg("Please fill out all fileds");
    }
    try {
      setLoading(true);
      setErrorMsg(null);
      const result = await makeRequest.post("/api/auth/signup", formData);
      if (result.status !== 200) {
        setLoading(false);
        console.log(result.data);
        return setErrorMsg(result.data.message);
      }
      if (result.status === 200) {
        navigate("/sign-in");
      }
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setLoading(false);
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
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FloatingLabel
              variant="filled"
              label="Username"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
            />
            <FloatingLabel
              variant="filled"
              label="Email"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <FloatingLabel
              variant="filled"
              label="Password"
              type="password"
              name="password"
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
                "Sing Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <NavLink to="/sign-in" className="text-blue-500">
              Sign In
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

export default SignUp;
