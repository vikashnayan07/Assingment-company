import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export async function authenticate(email) {
  try {
    return await axios.post("/api/authenticate", { email });
  } catch (error) {
    return { error: "Username not found" };
  }
}

export async function verifyPassword({ email, password }) {
  try {
    const response = await axios.post("/api/login", { email, password });
    const { data } = response;

   
    console.log("Response data:", data);

    if (data.data && data.data.token) {
      // Store the token in localStorage
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
    const { data, status } = await axios.post("/api/signup", credential);

    if (status === 201) {
      return Promise.resolve(data.msg);
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle specific error
      return Promise.reject({
        error: error.response.data.msg || "Email is already in use",
      });
    }
    // Handle general errors
    return Promise.reject({ error: error.message || "Registration error" });
  }
}
