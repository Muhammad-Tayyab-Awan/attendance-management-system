const api_url = import.meta.env.VITE_API_URI;

async function getAllUsersByAdmin() {
  const response = await fetch(`${api_url}/api/user/all-users`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const userApi = { getAllUsersByAdmin };
export default userApi;
