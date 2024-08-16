import React, { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";
import Projects from "./pages/Projects";
import PostPage from "./pages/PostPage";
import DashBoard from "./pages/DashBoard";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // repalced with ScrollToTop component
  // // Scroll restoration
  // useEffect(() => {
  //   window.history.scrollRestoration = "manual";
  // }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MyHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
