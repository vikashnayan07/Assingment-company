import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export async function authenticate(email) {
  try {
    const response = await axios.post("/api/auth/authenticate", { email });
    return response.data;
  } catch (error) {
    console.error(
      "Authentication error:",
      error.response ? error.response.data : error
    );
    return { error: "User not found" };
  }
}
export async function verifyPassword({ email, password }) {
  try {
    const response = await axios.post("/api/auth/login", { email, password });
    const { data } = response;

    console.log("Response data:", data);

    if (data.data && data.data.token) {
      localStorage.setItem("token", data.data.token);
      return Promise.resolve({ data });
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error);
    return Promise.reject({ error: "Incorrect Password" });
  }
}

export async function registerUser(credential) {
  try {
    const { data, status } = await axios.post("/api/auth/signup", credential);

    if (status === 201) {
      return Promise.resolve(data.msg);
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return Promise.reject({
        error: error.response.data.msg || "Email is already in use",
      });
    }

    return Promise.reject({ error: error.message || "Registration error" });
  }
}
