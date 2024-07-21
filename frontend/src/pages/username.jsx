import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { emailValidate } from "../helper/validate";
import useAuthStore from "../store/store";
import { authenticate } from "../helper/helper";

export default function Username() {
  const navigate = useNavigate();
  const setEmail = useAuthStore((state) => state.setEmail);

  const formik = useFormik({
    initialValues: {
      email: "example1@gmail.com",
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await authenticate(values.email);

        if (response.status === 200) {
          setEmail(values.email);
          navigate("/password");
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        toast.error("User not found");
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="flex justify-center items-center h-screen py-5">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
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
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Enter your email"
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/signup">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
