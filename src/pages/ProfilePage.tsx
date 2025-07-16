import supabase from "@/supabase/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { RiLogoutCircleLine } from "react-icons/ri";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    queryClient.clear();
  };

  return (
    <div className="flex h-screen w-full items-start justify-start p-10">
      {/* logout button */}
      <div
        onClick={() => handleSignout()}
        className="text-light-background bg-dark-background hover:bg-dark-background/90 flex cursor-pointer items-center gap-2 rounded-sm p-2.5 md:p-3"
      >
        <span>
          <RiLogoutCircleLine />
        </span>
        <span className="text-[clamp(.6rem,2vw+.6rem,.9rem)]">Log out</span>
      </div>
    </div>
  );
};

export default ProfilePage;
