import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./Router/Router"; // Assuming this is where you export the router
import AuthProvider from "./components/provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  </StrictMode>
);
