import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { passwordValidate } from "../helper/validate";

import { verifyPassword } from "../helper/helper";
import useAuthStore from "../store/centerStore";

export default function Password() {
  const navigate = useNavigate();
  const { email } = useAuthStore((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await verifyPassword({
          email,
          password: values.password,
        });

        const { token } = response.data.data;

        if (token) {
          localStorage.setItem("token", token);
          navigate("/searchpage");
        } else {
          throw new Error("Token not found");
        }
      } catch (error) {
        toast.error(error.error || "Incorrect password");
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-full py-5">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Hello Dost!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src="https://avatars.githubusercontent.com/u/115102517?s=400&u=53c0465f218c35139b958f1f1f99934e4f7a3f67&v=4"
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Login
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forget password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Reset now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
