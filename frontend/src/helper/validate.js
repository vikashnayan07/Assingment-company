import { authenticate, verifyPassword } from "./helper";
import toast from "react-hot-toast";

export async function emailValidate(values) {
  const errors = emailVerify({}, values);
  if (values.email) {
    try {
      const response = await authenticate(values.email);
      if (response.error) {
        errors.exist = toast.error("User not found");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      errors.exist = toast.error("Error during email validation");
    }
  }
  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export async function signUpValidation(values) {
  const errors = emailVerify({}, values);
  passwordVerify(errors, values);

  return errors;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required..");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username..");
  }
  return error;
}

function emailVerify(error = {}, values) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_+&*-]+(?:\\." +
      "[a-zA-Z0-9_+&*-]+)*@" +
      "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
      "A-Z]{2,7}$"
  );
  if (!values.email) {
    error.email = toast.error("Email Required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invalid email");
  }
  return error;
}

function passwordVerify(error = {}, values) {
  const passwordRegex = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$"
  );

  if (!values.password) {
    error.password = toast.error("Password Required..");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password..");
  } else if (values.password.length < 6) {
    error.password = toast.error("Password must be more than 6 char..");
  } else if (!passwordRegex.test(values.password)) {
    error.password = toast.error(
      "Password must contain an upper case, a lower case, a digit, and a special char.."
    );
  }
  return error;
}
