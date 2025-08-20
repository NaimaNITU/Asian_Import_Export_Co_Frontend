import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import Logo from "/assets/website_big_logo.png";
import WebsiteLogo from "../../components/shared/WebsiteLogo";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(
        name,
        "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
      );
      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 to-teal-100 px-4">
      <div className="flex flex-col w-full max-w-md p-6 sm:p-10 rounded-xl bg-white border border-teal-200 text-gray-800 shadow-lg">
        <Link to="/" className="flex items-center mb-12 h-10 w-auto">
          <WebsiteLogo />
        </Link>
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-800">
            Register
          </h1>
          <p className="text-sm text-teal-600">
            Welcome to Asian Import & Export
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-teal-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 border rounded-md border-teal-300 bg-teal-50 text-teal-900 outline-none placeholder:text-teal-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-teal-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border rounded-md border-teal-300 bg-teal-50 text-teal-900 outline-none placeholder:text-teal-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-teal-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                autoComplete="new-password"
                placeholder="*******"
                className="w-full px-4 py-2 border rounded-md border-teal-300 bg-teal-50 text-teal-900 outline-none placeholder:text-teal-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm text-teal-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                placeholder="*******"
                className="w-full px-4 py-2 border rounded-md border-teal-300 bg-teal-50 text-teal-900 outline-none placeholder:text-teal-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium flex justify-center items-center gap-2 transition-all"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex items-center pt-6 space-x-2">
          <div className="flex-1 h-px bg-teal-300"></div>
          <p className="px-3 text-sm text-teal-600">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px bg-teal-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3 mt-4 border border-teal-300 rounded-md p-2 cursor-pointer hover:bg-teal-100 transition-colors"
        >
          <FcGoogle size={28} />
          <span className="text-teal-700 font-medium">
            Continue with Google
          </span>
        </div>

        <p className="mt-6 text-sm text-center text-teal-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-amber-600 text-teal-700 transition-colors"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
