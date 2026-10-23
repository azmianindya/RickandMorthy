import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import api from "./axios";

type Params = Record<string, string | number | undefined>;

type Result<T> = {
  key: string;
  data: T | null;
  error: string | null;
};

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// endpoint null berarti request tidak dijalankan
const useFetch = <T>(endpoint: string | null, params?: Params): FetchState<T> => {
  const [result, setResult] = useState<Result<T> | null>(null);

  // Params diubah jadi string supaya effect hanya jalan ulang kalau isinya berubah
  const paramsKey = JSON.stringify(params ?? {});
  const requestKey = `${endpoint}?${paramsKey}`;

  useEffect(() => {
    if (endpoint === null) return;

    // Membatalkan request lama kalau params berubah sebelum request selesai
    const controller = new AbortController();
    const key = `${endpoint}?${paramsKey}`;

    // Membuang params yang kosong supaya tidak ikut dikirim
    const cleanParams = Object.fromEntries(
      Object.entries(JSON.parse(paramsKey) as Params).filter(
        ([, value]) => value !== ""
      )
    );

    api
      .get<T>(endpoint, { params: cleanParams, signal: controller.signal })
      .then((res) => setResult({ key, data: res.data, error: null }))
      .catch((err) => {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") return;

        // API membalas 404 kalau hasil pencarian kosong, dianggap data kosong
        if (isAxiosError(err) && err.response?.status === 404) {
          setResult({ key, data: null, error: null });
          return;
        }

        setResult({ key, data: null, error: "Gagal mengambil data" });
      });

    return () => controller.abort();
  }, [endpoint, paramsKey]);

  if (endpoint === null) return { data: null, loading: false, error: null };

  // Hasil dianggap milik request saat ini hanya kalau key-nya sama, kalau beda berarti masih loading
  const current = result?.key === requestKey ? result : null;

  return {
    data: current?.data ?? null,
    loading: current === null,
    error: current?.error ?? null,
  };
};

export default useFetch