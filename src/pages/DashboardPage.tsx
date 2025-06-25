import { useState, Fragment, useRef } from "react";
import { type BankListTypes } from "../types/bank.types";
import { Link } from "react-router-dom";
import { useBankList } from "../queries/useBankList";
import { useCreateBank } from "../queries/useCreateBank";
import { useSession } from "../context/SessionContext";
import { useDeleteBank } from "../queries/useDeleteBank";
import { useCreateAvatar } from "../queries/useCreateAvatar";

const DashboardPage = () => {
  const [bankName, setBankName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { session } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);

  //GET FETCH BANKS
  const {
    data: bankList,
    isLoading,
    isError,
    error,
  } = useBankList(session?.user.id ?? "");

  //ADD NEW BANK
  const { mutate: addBank, isPending: isAddPending } = useCreateBank(
    session?.user.id ?? ""
  );
  //REMOVE BANK
  const { mutate: removeBank, isPending: isRemovePending } = useDeleteBank(
    session?.user.id ?? ""
  );

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

  if (isError)
    return <div className="w-full h-screen p-10">{error.message}</div>;
  return (
    <div className="w-full h-screen flex flex-col p-10 ">
      <h1 className="text-3xl text-white">DashboardPage</h1>
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
          disabled={isAddPending}
          className="bg-amber-300 p-3 px-6 text-[#212121] mt-5 rounded-lg"
        >
          {isAddPending ? "Loading..." : "Add Bank"}
        </button>
      </form>
      <ul className="flex flex-col mt-10 gap-2">
        {!isLoading &&
          bankList?.map((bankItemData: BankListTypes) => (
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
