const api_url = import.meta.env.VITE_API_URI;

async function getAttendance() {
  const response = await fetch(`${api_url}/api/attendance`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function markAttendance() {
  const response = await fetch(`${api_url}/api/attendance`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

const attendanceApi = { getAttendance, markAttendance };

export default attendanceApi;
