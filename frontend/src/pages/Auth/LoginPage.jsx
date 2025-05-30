import { useState } from "react";
import { Link } from "react-router";
import { MessageSquare, Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import AuthImagePattern from "../../components/Auth/AuthImagePattern";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>

              <label className="input w-full">
                <Mail className="size-5 text-base-content/40 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  className="grow"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>

              <label className="input w-full">
                <Lock className="size-5 text-base-content/40 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="grow"
                  placeholder="*********"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </label>
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;
