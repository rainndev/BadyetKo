import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import type { BankTypes } from "../types/bank.types";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [BankName, setBankName] = useState("");
  const [bankList, setBankList] = useState<BankTypes[]>([]);

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
    <div className="w-full h-screen flex flex-col p-10 ">
      <h1 className="text-3xl text-white">DashboardPage</h1>
      <ul className="flex flex-col mt-10 gap-2">
        {bankList.map((bankItemData) => (
          <Link to={`/bank/${bankItemData.id}`}>
            <li>{bankItemData.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
