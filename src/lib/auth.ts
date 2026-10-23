import { MOCK_USERS } from "./data";

const SESSION_KEY = "rm-session";

export type Session = {
  username: string;
  email: string;
};

// Membaca sesi login dari localStorage (Remember me) atau sessionStorage
export const getSession = (): Session | null => {
  const raw =
    localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
};

// Mengembalikan sesi kalau akun cocok, atau null kalau salah
export const login = (
  identifier: string,
  password: string,
  remember: boolean
): Session | null => {
  const id = identifier.trim().toLowerCase();

  const user = MOCK_USERS.find(
    (item) =>
    (item.email.toLowerCase() === id || item.username.toLowerCase() === id) &&
    item.password === password
  );

  if (!user) return null;

  const session: Session = { username: user.username, email: user.email };

  // Remember me aktif: sesi bertahan setelah browser ditutup
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));

  return session;
};

// Menghapus sesi login dari kedua storage
export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
};