import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import supabase from "../supabase/supabase-client";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

//useSession hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  console.log(context);
  return context;
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      },
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SessionContext value={{ session }}>
      {isLoading ? (
        <div className="bg-medium-light-background text-dark-txt flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      ) : (
        children
      )}
    </SessionContext>
  );
};
