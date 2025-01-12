const api_url = import.meta.env.VITE_API_URI;

async function getAllUsersGrade() {
  const response = await fetch(`${api_url}/api/grade/all`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function getGrades() {
  const response = await fetch(`${api_url}/api/grade`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const gradeApi = { getAllUsersGrade, getGrades };

export default gradeApi;
