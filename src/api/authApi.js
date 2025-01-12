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

async function verifyLogin() {
  const response = await fetch(`${api_url}/api/user/verify-login`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.success) {
    return false;
  }
  delete data.success;
  data.status = true;
  return data;
}

async function logout() {
  const response = await fetch(`${api_url}/api/user/logout`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function register(credentials) {
  const response = await fetch(`${api_url}/api/user/`, {
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

async function getData() {
  const response = await fetch(`${api_url}/api/user/`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function updateDate(credentials) {
  const response = await fetch(`${api_url}/api/user/`, {
    credentials: "include",
    method: "PUT",
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
      .join(", ");
  }
  return data;
}

async function deleteAccount() {
  const response = await fetch(`${api_url}/api/user/`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

async function uploadImage(formData) {
  const response = await fetch(`${api_url}/api/user/upload`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

const authApi = {
  login,
  verifyLogin,
  logout,
  register,
  getData,
  updateDate,
  deleteAccount,
  uploadImage,
};

export default authApi;
