import { useBank } from "@/hooks/useBank";
import { useCreateAvatar } from "@/queries/useCreateAvatar";
import { addBankSchema } from "@/schemas/banks.schema";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSession } from "@/context/SessionContext";
import CustomBankAvatar from "./customBankAvatar";

interface BankAddModalProps {
  isShowModal: boolean;
  setShowModal: (show: boolean) => void;
}

const BankAddModal = ({ isShowModal, setShowModal }: BankAddModalProps) => {
  const [bankName, setBankName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { userID } = useSession();

  const { addBank, isAddBankPending, isAddBankSuccess } = useBank(userID);

  //Lock the body when showing modal
  useBodyScrollLock(isShowModal);

  //ADD NEW CUSTOM AVATAR
  const { mutate: addAvatar } = useCreateAvatar(image);

  //Add data to supabase
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = addBankSchema.safeParse({
      bankName,
      file: imageRef.current?.files?.[0],
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      for (const [_, messages] of Object.entries(errors)) {
        if (messages && messages.length > 0) {
          setErrorMessage(messages[0]);
          break;
        }
      }
      return;
    }

    let filePath = "";

    if (image) {
      filePath = `${userID}/${Date.now()}-${image.name}`;
      addAvatar({ filePath, image });
    }

    console.log("filePath", image);
    addBank({ bankName, custom_bank_avatar: filePath });
    setBankName("");
    setImage(null);
  };

  useEffect(() => {
    if (!isAddBankPending && isAddBankSuccess) {
      setShowModal(false);
      setErrorMessage("");
      //reset the image input and error message
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    }
  }, [isAddBankSuccess, isAddBankPending]);

  return (
    isShowModal && (
      <div className="bg-dark-background/90 fixed z-20 flex h-dvh w-screen items-center justify-center backdrop-blur-xs">
        <div className="bg-light-background text-dark-txt mx-3 flex w-full max-w-xl flex-col items-center justify-center rounded-2xl p-3">
          <div className="border-dark-txt/10 flex w-full justify-between border-b-2 p-5 md:p-10">
            <h1 className="text-fluid-xl">Add New accounts</h1>
            <button
              className="text-dark-txt/50 text-fluid-2xl cursor-pointer"
              disabled={isAddBankPending}
              onClick={() => setShowModal(false)}
            >
              <IoMdClose />
            </button>
          </div>

          <div className="w-full p-5 md:p-10">
            <form
              className="relative space-y-2 rounded-2xl"
              onSubmit={handleSubmit}
            >
              <CustomBankAvatar setImageCropped={setImage} />
              <p className="text-dark-txt/90 text-fluid-lg mb-2">Bank Name</p>

              <input
                type="text"
                value={bankName}
                placeholder="e.g. Example Bank"
                className="ring-dark-background/10 focus:ring-dark-background text-fluid-sm w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                onChange={(e) => setBankName(e.target.value)}
              />
              <p className="mb-2 text-sm text-red-400">{errorMessage}</p>

              <div className="grid w-full grid-cols-1 items-center justify-between gap-2 sm:grid-cols-2">
                <button
                  disabled={isAddBankPending}
                  className="bg-dark-background text-light-background hover:bg-dark-background/90 text-fluid-sm cursor-pointer rounded-lg p-3 px-6 transition-colors ease-in-out"
                >
                  {isAddBankPending ? "Loading..." : "Add Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default BankAddModal;
