import { useState } from "react";
import type { BankTypes } from "../types/bank.types";
import { Link } from "react-router-dom";
import { useBankList } from "../queries/useBankList";

const DashboardPage = () => {
  const [BankName, setBankName] = useState("");
  //   const [bankList, setBankList] = useState<BankTypes[]>([]);

  const { data: bankList, isLoading, isError, error } = useBankList();
  console.log("query", bankList);

  //   useEffect(() => {
  //     fetchBankList();
  //   }, []);

  //   const addNewBank = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const { data, error } = await supabase
  //       .from("banks")
  //       .insert([{ name: BankName }])
  //       .select()
  //       .single();

  //     if (error) throw error;
  //     setBankList((prevData) => [...prevData, data]);
  //     setBankName("");
  //   };

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
