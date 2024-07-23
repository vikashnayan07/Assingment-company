import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { signUpValidation } from "../helper/validate";
import { registerUser } from "../helper/helper";

export default function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: signUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register successfully...</b>,
        error: <b>Email is Already in use</b>,
      });
      registerPromise.then(() => {
        navigate("/");
      });
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-fit py-5">
        <div className={styles.glass} style={{ width: "35%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Signup User</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to connect you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src="https://avatars.githubusercontent.com/u/115102517?s=400&u=53c0465f218c35139b958f1f1f99934e4f7a3f67&v=4"
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("name")}
                className={styles.textbox}
                type="text"
                placeholder="Enter your fullname"
              />
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Enter email"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Enter password"
              />
              <button className={styles.btn} type="submit">
                Signup
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already have an account?{" "}
                <Link className="text-red-500" to="/">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
