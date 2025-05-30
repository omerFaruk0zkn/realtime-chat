import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import Navbar from "./components/Navbar/Navbar";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const SignUpPage = lazy(() => import("./pages/Auth/SignUpPage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SettingsPage = lazy(() => import("./pages/Settings/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <LoaderSkeleton />;

  return (
    <div data-theme={theme}>
      <Navbar />

      <Suspense fallback={<LoaderSkeleton />}>
        <Routes>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>

      <Toaster />
    </div>
  );
};

export default App;

const LoaderSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};
