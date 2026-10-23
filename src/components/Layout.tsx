import { Outlet, useLocation } from "@tanstack/react-router";
import Header from "./Header";

const Layout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen bg-linear-to-b from-yellow-100 to-lime-100 font-body text-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        {/* Header tidak ditampilkan di halaman login */}
        {!isLoginPage && <Header />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;