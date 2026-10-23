import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { AlertDialog, Button } from "@heroui/react";
import { NAV_LINKS } from "../lib/data";
import { getSession, logout } from "../lib/auth";

const Header = () => {
  const navigate = useNavigate();
  const session = getSession();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between gap-6 rounded-full bg-paper px-8 py-4 shadow-lg">
      {/* Logo */}
      <Link to="/" className="font-metal text-3xl text-portal-dark">
        Rick and Morty
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            // exact hanya untuk Home, supaya Home tidak ikut aktif di halaman lain
            activeOptions={{ exact: link.to === "/" }}
            className="border-b-2 border-transparent pb-1 text-sm font-medium text-ink/70 data-[status=active]:border-portal data-[status=active]:text-portal-dark"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
            alt="Avatar"
            className="size-10 rounded-full border-2 border-portal object-cover"
          />
          <div className="text-sm font-medium text-ink/80">
            {session?.username}
          </div>
        </div>

        <div className="h-8 w-px bg-portal/40" />

        {/* Logout dengan Konfirmasi */}
        <AlertDialog>
          <Button
            variant="danger"
            className="flex items-center gap-2 rounded-full bg-coral px-5 py-2 text-sm font-medium text-white"
          >
            Logout
            <LogOut size={18} />
          </Button>

          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading>
                    Yakin ingin keluar?
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    Kamu akan keluar dari akun <strong>{session?.username}</strong>.
                    Session kamu akan dihapus.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Batal
                  </Button>
                  <Button
                    slot="close"
                    variant="danger"
                    onPress={handleLogout}
                  >
                    Ya, Logout
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Header;