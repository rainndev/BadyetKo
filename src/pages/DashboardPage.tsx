import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import type { BankTypes } from "../types/bank.types";

const DashboardPage = () => {
  const [BankName, setBankName] = useState("");
  const [bankList, setBankList] = useState<BankTypes[]>([]);

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const fetchTodo = async () => {
    const { data, error } = await supabase.from("banks").select("*");

    if (error) throw error;
    console.log(data);
    setBankList(data);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const addNewBank = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("banks")
      .insert([{ name: BankName }])
      .select()
      .single();

    if (error) throw error;
    setBankList((prevData) => [...prevData, data]);
    setBankName("");
  };

  const deleteBank = async (id: string) => {
    const { data, error } = await supabase
      .from("banks")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    setBankList(bankList.filter((bankName) => bankName.id !== data.id));
    setBankName("");
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
