const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const isForm = options.body instanceof FormData;
  const headers = isForm
    ? { ...(options.headers || {}) }
    : { "Content-Type": "application/json", ...(options.headers || {}) };

  const response = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  health: () => request("/health"),
  getCases: () => request("/cases"),
  getCase: (id) => request(`/cases/${id}`),
  createCase: (data) => request("/cases", { method: "POST", body: JSON.stringify(data) }),
  updateCase: (id, data) => request(`/cases/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  interview: (id, data) => request(`/cases/${id}/interview`, { method: "POST", body: JSON.stringify(data) }),
  status: (id, status) => request(`/cases/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  uploadDocuments: (id, files) => {
    const form = new FormData();
    files.forEach((file) => form.append("documents", file));
    return request(`/cases/${id}/documents`, { method: "POST", body: form });
  },
};