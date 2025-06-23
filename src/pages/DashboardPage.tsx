import supabase from "../supabase/supabase-client";

const DashboardPage = () => {
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>DashboardPage</h1>
      <button
        onClick={() => handleSignout()}
        className="p-2 px-5 text-[#212121] bg-amber-300 rounded-sm mt-5"
      >
        Signout
      </button>
    </div>
  );
};

export default DashboardPage;
