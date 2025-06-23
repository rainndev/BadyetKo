import { useState } from "react";
import type { BankTypes } from "../types/bank.types";
import { Link } from "react-router-dom";
import { useBankList } from "../queries/useBankList";
import { useCreateBank } from "../queries/useCreateBank";

const DashboardPage = () => {
  const [bankName, setBankName] = useState("");

  const { data: bankList, isLoading, isError, error } = useBankList();
  const { mutate: addBank, isPending } = useCreateBank();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBank(bankName);
    setBankName("");
  };

  //   console.log("query", bankList);
  //   const deleteBank = async (id: string) => {
  //     const { data, error } = await supabase
  //       .from("banks")
  //       .delete()
  //       .eq("id", id)
  //       .select()
  //       .single();

  //     if (error) throw error;
  //     setBankList(bankList.filter((bankName) => bankName.id !== data.id));
  //     setBankName("");
  //   };

  if (isError)
    return <div className="w-full h-screen p-10">{error.message}</div>;
  return (
    <div className="w-full h-screen flex flex-col p-10 ">
      <h1 className="text-3xl text-white">DashboardPage</h1>
      <form className="mt-10" onSubmit={handleSubmit}>
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Input your email"
          className="ring ring-amber-300 p-3 rounded-lg w-full"
        />
        <button
          disabled={isPending}
          className="bg-amber-300 p-3 px-6 text-[#212121] mt-5 rounded-lg"
        >
          {isPending ? "Loading..." : "Add Bank"}
        </button>
      </form>
      <ul className="flex flex-col mt-10 gap-2">
        {!isLoading &&
          bankList?.map((bankItemData: BankTypes) => (
            <Link key={bankItemData.id} to={`/bank/${bankItemData.id}`}>
              <li>{bankItemData.name}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
