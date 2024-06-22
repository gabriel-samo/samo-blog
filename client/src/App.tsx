import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";
import FooterComp from "./components/FooterComp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;
