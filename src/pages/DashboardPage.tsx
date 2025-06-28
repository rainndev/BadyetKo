import { useState, useRef } from "react";
import { type BankListTypes } from "../types/bank.types";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { useCreateAvatar } from "../queries/useCreateAvatar";
import BankImage from "../components/BankImage";
import { FaPiggyBank } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import AreaChartData from "../components/AreaChartData";
import { useNetBalance } from "@/queries/useNetBalance";
import { useBank } from "@/hooks/useBank";
const DashboardPage = () => {
  const [bankName, setBankName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { session } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);

  const user_id = session?.user.id ?? "";

  //GET NET BALANCE
  const { data: userBalance } = useNetBalance(user_id);
  const totalBalance = userBalance?.[0].net_balance ?? 0;

  const {
    addBank,
    removeBank,
    bankList,
    isBankListError,
    isAddBankPending,
    bankListError,
    isBankListLoading,
  } = useBank(user_id);

  //ADD NEW CUSTOM AVATAR
  const { mutate: addAvatar } = useCreateAvatar(image);

  //SELECTING FILE AVATAR
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  //Add data to supabase
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let filePath = "";

    if (image) {
      filePath = `${session?.user.id}/${Date.now()}-${image.name}`;
      addAvatar({ filePath, image });
    }
    addBank({ bankName, custom_bank_avatar: filePath });
    setBankName("");
    setImage(null);

    //reset the image input
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  if (isBankListError)
    return (
      <div className="w-full min-h-screen p-10">{bankListError?.message}</div>
    );

  console.log("banks", bankList);
  return (
    <div className="w-full h-full flex flex-col p-10 ">
      <h1 className="text-3xl text-white">DashboardPage</h1>
      <h1>Net Balance: {totalBalance}</h1>
      {/* Form for inputing data */}
      <form className="mt-10" onSubmit={handleSubmit}>
        <input
          type="text"
          value={bankName}
          className="ring ring-amber-300 p-3 rounded-lg w-full"
          onChange={(e) => setBankName(e.target.value)}
        />
        <input
          ref={imageRef}
          onChange={handleFileChange}
          type="file"
          id="avatar"
          name="filename"
        />
        <button
          disabled={isAddBankPending}
          className="bg-amber-300 p-3 px-6 text-[#212121] mt-5 rounded-lg"
        >
          {isAddBankPending ? "Loading..." : "Add Bank"}
        </button>
      </form>

      {/* Charts  */}
      <AreaChartData />

      {/* list data to render */}
      <ul className="flex mt-10 gap-10">
        {!isBankListLoading &&
          bankList?.map((bankItemData: BankListTypes) => (
            <div
              className="bg-amber-300/10 flex items-center relative  justify-center p-10 rounded-lg"
              key={bankItemData.id}
            >
              <Link
                to={`/bank/${bankItemData.id}?balance=${bankItemData.balance}`}
              >
                <div className="space-y-2">
                  <li>Balance: {bankItemData.balance}</li>
                  <li>{bankItemData.name}</li>

                  {bankItemData.custom_bank_avatar ? (
                    <BankImage path={bankItemData.custom_bank_avatar} />
                  ) : (
                    <FaPiggyBank className="text-5xl text-white" />
                  )}
                </div>
              </Link>
              <IoMdClose
                className="cursor-pointer  text-white absolute right-2 top-2 text-2xl w-fit rounded-lg"
                onClick={() => removeBank(bankItemData.id)}
              />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
