import {
  buildQueryString,
  cookies,
  handleGlobalError,
} from "../utils/functions";

export const BASE_URL = import.meta.env.VITE_API_URL || "/api";

let refreshPromise: Promise<string | null> | null = null;

/* ------------------ Refresh Token ------------------ */
async function refreshToken(): Promise<string | null> {
  if (!refreshPromise) {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) return null;

    refreshPromise = fetch(`${BASE_URL}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = handleGlobalError(
            new Error("Token refresh failed"),
            "refreshToken"
          );
          throw error;
        }

        const json = await res.json();
        const accessToken = json?.data?.tokens?.accessToken;
        const newRefreshToken = json?.data?.tokens?.refreshToken;

        if (accessToken) cookies.set("token", accessToken);
        if (newRefreshToken) cookies.set("refreshToken", newRefreshToken);

        return accessToken ?? null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

/* ------------------ API Fetch ------------------ */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  params?: {}
): Promise<T> {
  let token = cookies.get("token");

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const qs = buildQueryString(params);
    if (qs) url += `?${qs}`;
  }

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res = await fetch(url, {
    ...options,
    headers,
  });

  /* ---------- Handle expired token ---------- */
  if (res.status === 401 && token) {
    const newToken = await refreshToken();

    if (!newToken) {
      logout();
      const error = handleGlobalError(new Error("Unauthorized"), "apiFetch");
      throw error;
    }

    res = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  const data = await res.json();

  if (!res.ok || data?.success === false) {
    const error = handleGlobalError(
      new Error(data?.error || "Something went wrong"),
      "apiFetch"
    );
    throw error;
  }

  return data as T;
}

/* ------------------ Logout ------------------ */
function logout() {
  cookies.remove("token");
  cookies.remove("refreshToken");
  window.location.href = "/auth/login";
}
