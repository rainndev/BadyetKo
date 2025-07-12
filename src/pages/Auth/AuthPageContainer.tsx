import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import TransparentLogo from "@/assets/logos/transaprent-logo-w-text.png";
import SigninPage from "@/pages/Auth/SigninPage";
import SignupPage from "./SignupPage";

const AuthPageContainer = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);

  const { session } = useSession();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return (
    <div className="bg-medium-light-background text-dark-txt flex h-screen w-full flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div>
          <img
            src={TransparentLogo}
            alt="transparent logo with text"
            className="mb-10"
          />
          <hr className="mb-15" />
          <h1 className="text-dark-txt mb-2 text-[clamp(1rem,1vw+1rem,1.3rem)] font-bold">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="text-[clamp(.6rem,1.5vw+.6rem,1rem)] text-gray-600">
            {isLogin
              ? "Log in to track your bank balances, deposits, and withdrawals in one place."
              : "Create an account to start managing multiple bank accounts with ease."}
          </p>
        </div>

        {isLogin ? <SigninPage /> : <SignupPage />}

        <div
          onClick={() => {
            setLogin(!isLogin);
          }}
          className="text-dark-txt/70 mt-2 cursor-pointer text-[clamp(.6rem,1.5vw+.6rem,1rem)]"
        >
          <p>
            {isLogin ? "New here? " : "Already registered? "}
            <span className="text-dark-txt font-semibold underline">
              {isLogin ? "Create an account. " : "Log in here. "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPageContainer;
