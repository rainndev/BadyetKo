import { useSession } from "@/context/SessionContext";
import supabase from "@/supabase/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { RiLogoutCircleLine } from "react-icons/ri";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    queryClient.clear();
  };

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start p-10">
      {/* logout button */}
      <div
        onClick={() => handleSignout()}
        className="text-light-background bg-dark-background hover:bg-dark-background/90 flex cursor-pointer items-center gap-2 rounded-sm p-2.5 md:p-3"
      >
        <span>
          <RiLogoutCircleLine />
        </span>

        <span className="text-fluid-sm">Log out</span>
      </div>
      <h1 className="text-fluid-base mt-5">{session?.user.email}</h1>
    </div>
  );
};

export default ProfilePage;
