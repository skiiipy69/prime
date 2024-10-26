import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { action as registerAction } from "./pages/Register/RegisterPage";
import { action as loginAction } from "./pages/Login/LoginPage";
import LandingPage from "./pages/LandingPage";
import About from "./pages/AboutUs/";
import ContactUs from "./pages/ContactUs";
import HowToPlay from "./pages/HowToPlay";
import Dashboard from "./pages/Dashboard"; // Add this import
import RootLayout from "./layout/RootLayout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import {
  LoginPage,
  Question,
  RegisterPage,
  NotFound,
  SingleQuestion,
  RequireAuth,
  RequireLogout,
  Success,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      {/* Public route - Landing page */}
      <Route index element={<LandingPage />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<ContactUs />} />
      <Route element={<RequireLogout />}>
        <Route path="login" element={<LoginPage />} action={loginAction} />
        <Route path="register" element={<RegisterPage />} action={registerAction} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="home" element={<App />} />
        <Route path="dashboard" element={<Dashboard />} /> {/* Add this route */}
        <Route path="howtoplay" element={<HowToPlay />} />
        <Route path="question" element={<Question />} />
        <Route path="question/:id" element={<SingleQuestion />} />
        <Route path="finish" element={<Success />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);