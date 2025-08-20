import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import WebsiteLogo from "../../components/shared/WebsiteLogo";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 to-teal-100 px-4">
      <div className="flex flex-col w-full max-w-md p-6 sm:p-10 rounded-xl bg-white border border-teal-200 text-gray-800 shadow-lg">
        <Link to="/" className="flex items-center mb-12 h-10 w-auto">
          <WebsiteLogo />
        </Link>

        <div className="mb-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-800">
            Log In
          </h1>
          <p className="text-sm text-teal-600">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
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
                placeholder="Enter Your Email Here"
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
                autoComplete="current-password"
                placeholder="*******"
                className="w-full px-4 py-2 border rounded-md border-teal-300 bg-teal-50 text-teal-900 outline-none placeholder:text-teal-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="mt-2 flex justify-between items-center">
          <button className="text-xs hover:underline hover:text-amber-600 text-teal-600 transition-colors">
            Forgot password?
          </button>
        </div>

        <div className="flex items-center pt-6 space-x-2">
          <div className="flex-1 h-px bg-teal-300"></div>
          <p className="px-3 text-sm text-teal-600">
            Login with social accounts
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
          Don&apos;t have an account yet?{" "}
          <Link
            to="/register"
            className="hover:underline hover:text-amber-600 text-teal-700 transition-colors"
          >
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
