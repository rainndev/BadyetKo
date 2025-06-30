import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="bg-medium-light-background text-dark-txt flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-dark-txt mb-5 text-2xl font-black">
        {isLogin ? "Log in " : "Sign up"}
      </h1>
      <form
        onSubmit={handleAuth}
        className="flex w-full max-w-sm flex-col gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Input your email"
          className="ring-dark-background/10 w-full rounded-lg p-3 ring"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Input your password"
          className="ring-dark-background/10 w-full rounded-lg p-3 ring"
        />

        <button className="bg-dark-background text-medium-light-background w-full rounded-lg p-3">
          {isLogin ? "Log in " : "Sign up"}
        </button>
        <p className="text-red-400">{error}</p>
        <p
          onClick={() => setLogin(!isLogin)}
          className="text-dark-txt/70 cursor-pointer"
        >
          {isLogin
            ? "New here? Create an account."
            : "Already registered? Log in here."}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
