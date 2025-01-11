const api_url = import.meta.env.VITE_API_URI;

async function login(credentials) {
  const response = await fetch(`${api_url}/api/user/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!data.success) {
    if (!Array.isArray(data.error)) {
      return data;
    }
    data.error = data.error
      .map((error) => {
        return error.msg;
      })
      .join(",");
  }
  return data;
}

const authApi = {
  login,
};

export default authApi;
