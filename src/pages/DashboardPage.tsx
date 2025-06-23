import { useState, Fragment } from "react";
import type { BankTypes } from "../types/bank.types";
import { Link } from "react-router-dom";
import { useBankList } from "../queries/useBankList";
import { useCreateBank } from "../queries/useCreateBank";
import { useSession } from "../context/SessionContext";
import { useDeleteBank } from "../queries/useDeleteBank";

const DashboardPage = () => {
  const [bankName, setBankName] = useState("");
  const { session } = useSession();

  //GET FETCH BANKS
  const {
    data: bankList,
    isLoading,
    isError,
    error,
  } = useBankList(session?.user.id ?? "");

  //POST NEW BANK
  const { mutate: addBank, isPending: isAddPending } = useCreateBank(
    session?.user.id ?? ""
  );
  const { mutate: removeBank, isPending: isRemovePending } = useDeleteBank(
    session?.user.id ?? ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBank(bankName);
    setBankName("");
  };

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
          disabled={isAddPending}
          className="bg-amber-300 p-3 px-6 text-[#212121] mt-5 rounded-lg"
        >
          {isAddPending ? "Loading..." : "Add Bank"}
        </button>
      </form>
      <ul className="flex flex-col mt-10 gap-2">
        {!isLoading &&
          bankList?.map((bankItemData: BankTypes) => (
            <Fragment key={bankItemData.id}>
              <Link to={`/bank/${bankItemData.id}`}>
                <li>{bankItemData.name}</li>
              </Link>

              <button
                disabled={isRemovePending}
                className="cursor-pointer px-4 p-2 bg-amber-300 text-[#212121] w-fit rounded-lg"
                onClick={() => removeBank(bankItemData.id)}
              >
                X
              </button>
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
