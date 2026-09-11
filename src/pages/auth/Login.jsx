import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../data/mockData";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUserName = useAuthStore((state) => state.setUserName);
  const setUserId = useAuthStore((state) => state.setUserId);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    // finding the user in mock users
    const user = mockUsers.find(
      (dummyUser) => dummyUser.email === formData.email,
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    if (user.password !== formData.password) {
      setError("Invalid email or password.");
      return;
    }
    // using zustand store to set the values
    setIsLoggedIn(true);
    setUserName(user.name);
    setUserId(user.id);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-mainBG text-textmain flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-3xl font-semibold tracking-wide">Stockly</h1>
        </div>

        {/* Login Card */}
        <div className="bg-secondaryBG rounded-3xl p-8">
          <div className="mb-10">
            <h2 className="text-2xl text-center font-semibold">Welcome back</h2>

            <p className="text-textsecondary  text-center mt-2 text-sm">
              Sign in to manage your stock portfolio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-textsecondary mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-highlight border border-transparent px-4 py-3 text-textmain placeholder:text-textsecondary outline-none transition focus:border-accent"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-textsecondary mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-highlight border border-transparent px-4 py-3 text-textmain placeholder:text-textsecondary outline-none transition focus:border-accent"
              />
            </div>

            {/* Error */}
            {error && <p className="text-sm text-danger">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-accent text-white py-3 mt-6 font-medium transition hover:opacity-90 cursor-pointer"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
