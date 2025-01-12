const api_url = import.meta.env.VITE_API_URI;

async function submitTodayLeave(request) {
  request.startDate = new Date().toISOString().split("T")[0];
  request.endDate = new Date().toISOString().split("T")[0];

  const response = await fetch(`${api_url}/api/leave`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  console.log("called");
  const data = await response.json();
  if (!data.success) {
    if (!Array.isArray(data.error)) {
      return data;
    }
    data.error = data.error
      .map((error) => {
        return error.msg;
      })
      .join(", ");
  }
  return data;
}

const leaveApi = {
  submitTodayLeave,
};

export default leaveApi;
