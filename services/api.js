export const API_URL = "https://banksia04.ifn666.com/assessment02/api";

async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timer);

    const text = await response.text();

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (error) {
      data = { message: text };
    }

    if (!response.ok) {
      console.log("API ERROR STATUS:", response.status);
      console.log("API ERROR DATA:", data);

      throw new Error(
        data.message ||
          data.error ||
          data.errors?.[0]?.msg ||
          JSON.stringify(data) ||
          "API request failed"
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timer);

    if (error.name === "AbortError") {
      throw new Error("Request timed out. Check server URL or server is off.");
    }

    throw new Error(error.message);
  }
}

export async function loginUser(username, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
}

export async function getTasks(token) {
  return apiRequest("/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getEmployees(token) {
  return apiRequest("/employees", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getWorksites(token) {
  return apiRequest("/worksites", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createTask(token, task) {
  return apiRequest("/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
}

export async function updateTask(token, taskId, task) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
}
export async function deleteTask(token, taskId) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}