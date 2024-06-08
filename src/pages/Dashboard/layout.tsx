import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import ROUTES from "@/router/routes";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

export default function Layout({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  // Handle Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  // Handle Logout loader
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Login Loader
  const [showLoginLoader, setShowLoginLoader] = useState(true);

  useEffect(() => {
    // Simulating login loader
    const loading = setTimeout(() => {
      setShowLoginLoader(false);
    }, 2000);

    return () => {
      clearTimeout(loading);
    };
  }, []);

  // Check if logging out
  if (isLoggingOut) {
    return <FullScreenLoader text="Logging Out" />;
  }

  // Check if login loader is shown
  if (showLoginLoader) {
    return (
      <FullScreenLoader text="Please wait while we are setting up environment" />
    );
  }

  // Render the main layout
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header setIsLoggingOut={setIsLoggingOut} />
      <Sidebar setIsLoggingOut={setIsLoggingOut} />
      <main className="p-4 md:ml-64 h-auto pt-20 min-h-[100vh]">
        <Outlet />
      </main>
    </div>
  );
}
