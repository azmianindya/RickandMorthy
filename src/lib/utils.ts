// Mengambil teks dari search param, string kosong dianggap tidak ada
export const asText = (value: unknown): string | undefined =>
  typeof value === "string" && value !== "" ? value : undefined;

// Mengambil nomor halaman dari search param, halaman 1 dianggap default
export const asPage = (value: unknown): number | undefined => {
  const page = Number(value);
  return Number.isInteger(page) && page > 1 ? page : undefined;
};

// Mengambil id di akhir URL API, mis. ".../episode/1" jadi "1"
export const getIdFromUrl = (url: string): string => url.split("/").pop() ?? "";

// Membuat URL gambar karakter dari URL karakter di API
export const getAvatarFromCharacterUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  return `https://rickandmortyapi.com/api/character/avatar/${getIdFromUrl(url)}.jpeg`;
};