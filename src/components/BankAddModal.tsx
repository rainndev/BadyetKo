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
    setShowModal(false);
  };

  return (
    <div className="bg-dark-background/90 fixed z-9999 flex h-screen w-screen items-center justify-center backdrop-blur-xs">
      <div className="bg-light-background text-dark-txt relative flex h-[80%] w-full max-w-3xl items-center justify-center rounded-3xl">
        <button
          className="absolute top-5 right-5"
          disabled={isAddBankPending}
          onClick={() => setShowModal(false)}
        >
          <IoMdClose className="text-xl" />
        </button>

        <form className="mt-10" onSubmit={handleSubmit}>
          <p className="mb-2">Bank Name</p>
          <input
            type="text"
            value={bankName}
            className="ring-dark-background/10 w-full rounded-lg p-3 ring"
            onChange={(e) => setBankName(e.target.value)}
          />
          <p className="mb-2 text-sm text-red-400">{errorMessage}</p>
          <input
            ref={imageRef}
            onChange={handleFileChange}
            type="file"
            id="avatar"
            name="filename"
          />

          <button
            disabled={isAddBankPending}
            className="bg-dark-background text-light-background mt-5 rounded-lg p-3 px-6"
          >
            {isAddBankPending ? "Loading..." : "Add Bank"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankAddModal;
