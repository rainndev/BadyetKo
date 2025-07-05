import { useBank } from "@/hooks/useBank";
import { useCreateAvatar } from "@/queries/useCreateAvatar";
import { addBankSchema } from "@/schemas/banks.schema";
import { IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";

interface BankAddModalProps {
  isShowModal: boolean;
  setShowModal: (show: boolean) => void;
  user_id: string;
}

const BankAddModal = ({
  isShowModal,
  setShowModal,
  user_id,
}: BankAddModalProps) => {
  if (!isShowModal) return null;

  const [bankName, setBankName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);

  const { addBank, isAddBankPending } = useBank(user_id);

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
      filePath = `${user_id}/${Date.now()}-${image.name}`;
      addAvatar({ filePath, image });
    }
    addBank({ bankName, custom_bank_avatar: filePath });
    setBankName("");
    setImage(null);

    //reset the image input and error message
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setErrorMessage("");
    if (!isAddBankPending) {
      setShowModal(false);
    }
  };

  return (
    <div className="bg-dark-background/90 fixed z-20 flex h-dvh w-screen items-center justify-center backdrop-blur-xs">
      <div className="bg-light-background text-dark-txt mx-3 flex w-full max-w-xl flex-col items-center justify-center rounded-2xl p-3">
        <div className="border-dark-txt/10 flex w-full justify-between border-b-2 p-5 md:p-10">
          <h1 className="text-[clamp(.8rem,2vw+.8rem,1.5rem)]">Add New Bank</h1>
          <button
            className="text-dark-txt/50 cursor-pointer text-[clamp(.8rem,2vw+.8rem,1.5rem)]"
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
            <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
              Bank Name
            </p>

            <input
              type="text"
              value={bankName}
              placeholder="e.g. Example Bank"
              className="ring-dark-background/20 text-dark-txt/80 w-full rounded-lg p-3 text-[clamp(.6rem,1vw+.6rem,1rem)] ring"
              onChange={(e) => setBankName(e.target.value)}
            />
            <p className="mb-2 text-sm text-red-400">{errorMessage}</p>

            <div className="grid w-full grid-cols-1 items-center justify-between gap-2 sm:grid-cols-2">
              <input
                ref={imageRef}
                onChange={handleFileChange}
                type="file"
                id="avatar"
                name="filename"
                className="border-dark-txt/20 hover:border-dark-background cursor-pointer rounded-lg border border-dashed p-3 text-[clamp(.4rem,2vw+.4rem,1rem)] transition-colors ease-in-out"
              />

              <button
                disabled={isAddBankPending}
                className="bg-dark-background text-light-background hover:bg-dark-background/90 cursor-pointer rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)] transition-colors ease-in-out"
              >
                {isAddBankPending ? "Loading..." : "Add Bank"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankAddModal;
