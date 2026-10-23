// Link menu di Header. URL ikut nama folder di routes/
export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Characters", to: "/characters" },
  { label: "Locations", to: "/location" },
  { label: "Episodes", to: "/episode" },
] as const;

// Akun untuk login mock. Hanya untuk latihan, bukan autentikasi sungguhan
export const MOCK_USERS = [
  {
    username: "MultiverseFan",
    email: "multiverse@mail.com",
    password: "wubbalubba",
  },
];

// Isi 3 kartu menu di halaman Home
export const HOME_MENU = [
  {
    title: "Characters",
    desc: "Meet the weirdest people in the multiverse!",
    to: "/characters",
  },
  {
    title: "Locations",
    desc: "Discover all known locations.",
    to: "/location",
  },
  {
    title: "Episodes",
    desc: "Watch every episode and its details.",
    to: "/episode",
  },
] as const;

// Opsi filter halaman Characters
export const STATUS_OPTIONS = [
  { key: "", label: "All Status" },
  { key: "alive", label: "Alive" },
  { key: "dead", label: "Dead" },
  { key: "unknown", label: "Unknown" },
];

export const GENDER_OPTIONS = [
  { key: "", label: "All Gender" },
  { key: "female", label: "Female" },
  { key: "male", label: "Male" },
  { key: "genderless", label: "Genderless" },
  { key: "unknown", label: "Unknown" },
];

// Opsi filter halaman Locations. API mencocokkan sebagian teks, jadi "Planet" juga mengenai "Dwarf planet"
export const LOCATION_TYPE_OPTIONS = [
  { key: "", label: "All Type" },
  { key: "planet", label: "Planet" },
  { key: "cluster", label: "Cluster" },
  { key: "space station", label: "Space Station" },
  { key: "microverse", label: "Microverse" },
  { key: "tv", label: "TV" },
  { key: "resort", label: "Resort" },
  { key: "fantasy town", label: "Fantasy Town" },
  { key: "dream", label: "Dream" },
  { key: "dimension", label: "Dimension" },
  { key: "game", label: "Game" },
];

// Opsi filter halaman Episodes. Key dikirim ke API sebagai kode season (S01, S02, ...)
export const SEASON_OPTIONS = [
  { key: "", label: "All Season" },
  { key: "S01", label: "Season 1" },
  { key: "S02", label: "Season 2" },
  { key: "S03", label: "Season 3" },
  { key: "S04", label: "Season 4" },
  { key: "S05", label: "Season 5" },
];