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
    <div className="w-full h-screen flex flex-col  items-center justify-center bg-medium-light-background text-dark-txt">
      <h1 className="text-2xl font-black text-dark-txt mb-5">
        {isLogin ? "Log in " : "Sign up"}
      </h1>
      <form
        onSubmit={handleAuth}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Input your email"
          className="ring ring-dark-background/10 p-3 rounded-lg w-full"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Input your password"
          className="ring ring-dark-background/10 p-3 rounded-lg w-full"
        />

        <button className="w-full rounded-lg bg-dark-background p-3 text-medium-light-background">
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
