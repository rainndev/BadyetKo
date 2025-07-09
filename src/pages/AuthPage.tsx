import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import TransparentLogo from "@/assets/logos/transaprent-logo-w-text.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const { session } = useSession();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return null;
      }
    } else {
      if (password.trim() !== confirmPass.trim()) {
        setError("Passwords do not match. Please double-check and try again.");
        return null;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return null;
      }

      await supabase.from("users").insert([
        {
          id: data.user?.id,
          name: data.user?.user_metadata.full_name ?? "",
          email: data.user?.email,
        },
      ]);
    }
  };

  return (
    <div className="bg-medium-light-background text-dark-txt flex h-screen w-full flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div>
          <img src={TransparentLogo} alt="tranparent logo with text" />
          <hr className="my-10" />
          <h1 className="text-dark-txt mb-2 text-[clamp(1rem,1vw+1rem,1.3rem)] font-bold">
            {isLogin ? "Welcome Back" : "Get Started "}
          </h1>
          <p className="text-[clamp(.6rem,1.5vw+.6rem,1rem)] text-gray-600">
            {isLogin
              ? "Log in to track your bank balances, deposits, and withdrawals in one place."
              : "Create an account to start managing multiple bank accounts with ease."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="mt-5 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input your email"
            className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your password"
            className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
          />

          {!isLogin && (
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm your password"
              className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
            />
          )}

          <button className="bg-dark-background hover:bg-dark-background/90 text-medium-light-background w-full cursor-pointer rounded-lg p-3 transition-colors ease-in-out">
            {isLogin ? "Log in " : "Sign up"}
          </button>
          <p className="text-[clamp(.6rem,1.5vw+.6rem,1rem)] text-red-400">
            {error}
          </p>
          <div
            onClick={() => setLogin(!isLogin)}
            className="text-dark-txt/70 cursor-pointer text-[clamp(.6rem,1.5vw+.6rem,1rem)]"
          >
            {isLogin ? (
              <p>
                New here?{" "}
                <span className="text-dark-txt font-semibold underline">
                  Create an account.
                </span>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <span className="text-dark-txt font-semibold underline">
                  Log in here.
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
