import { createRootRoute, redirect } from "@tanstack/react-router";
import Layout from "../components/Layout";
import { getSession } from "../lib/auth";

export const Route = createRootRoute({
  // Dicek di setiap pindah halaman
  beforeLoad: ({ location }) => {
    const isLoggedIn = getSession() !== null;
    const isLoginPage = location.pathname === "/login";

    // Belum login: semua halaman diarahkan ke /login
    if (!isLoggedIn && !isLoginPage) {
      throw redirect({ to: "/login" });
    }

    // Sudah login: halaman login tidak perlu dibuka lagi
    if (isLoggedIn && isLoginPage) {
      throw redirect({ to: "/" });
    }
  },
  component: Layout,
});