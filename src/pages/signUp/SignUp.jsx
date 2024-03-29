import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import signUpAnimation from "../../assets/animation/signup-animation.json";
import Lottie from "lottie-react";
import SocialLogin from "../../shared/socialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;
    const photo = data?.photo;

    createUser(email, password)
      .then((res) => {
        if (res?.user) {
          updateUser(name, photo).then(() => {
            const userInfo = {
              name,
              photo,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
            reset();
            navigate("/login");
          });
        }
      })
      .catch((error) => {
        const err = error.message;
        setErrorMessage(err);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero min-h-screen bg-base-200 max-w-7xl mx-auto px-1">
      <Helmet>
        <title>TravelizeBD | Register</title>
      </Helmet>
      <div className="hero-content w-full flex-col lg:flex-row ">
        <div className="text-center w-1/2 ">
          <h1 className="text-5xl font-bold mb-6">Register now!</h1>

          <Lottie
            className="h-[420px]"
            animationData={signUpAnimation}
            loop={false}
          ></Lottie>
        </div>
        <div className="card  w-full max-w-sm shadow-2xl bg-base-100 ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                {...register("name")}
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email")}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="photo"
                name="photo"
                {...register("photo")}
                placeholder="photo url"
                className="input input-bordered"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register("password")}
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                {showPassword ? (
                  <span
                    onClick={handleShowPassword}
                    className="absolute right-2 top-4 cursor-pointer"
                  >
                    <FaEyeSlash />
                  </span>
                ) : (
                  <span
                    onClick={handleShowPassword}
                    className="absolute right-2 top-4 cursor-pointer"
                  >
                    <FaEye />
                  </span>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline bg-slate-800 text-base-100">
                Register
              </button>
            </div>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
              Already have an account?
              <Link to="/login">
                <a className="font-medium text-gray-900">Login</a>
              </Link>
            </p>
          </form>
          <div className="form-control">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
