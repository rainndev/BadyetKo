import { useBank } from "@/hooks/useBank";
import { useCreateAvatar } from "@/queries/useCreateAvatar";
import { addBankSchema } from "@/schemas/banks.schema";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/context/SessionContext";
import CustomBankAvatar from "@/components/CustomBankAvatar";
import TransparentLogoOnly from "@/assets/logos/transparent-logo-only.png";
import { motion } from "framer-motion";

interface BankAddModalProps {
  setShowModal: (show: boolean) => void;
}

const BankAddModal = ({ setShowModal }: BankAddModalProps) => {
  const [bankName, setBankName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const { userID } = useSession();
  const { addBank, isAddBankPending, isAddBankSuccess } = useBank();

  //ADD NEW CUSTOM AVATAR
  const { mutate: addAvatar } = useCreateAvatar(image);

  //Add data to supabase
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
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
    <div className="bg-dark-background/90 fixed z-20 flex h-dvh w-screen items-center justify-center backdrop-blur-xs">
      {/* container  */}
      <motion.div
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.95,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="bg-light-background text-dark-txt mx-3 flex w-full max-w-md flex-col items-center justify-center rounded-2xl p-3"
      >
        <div className="border-dark-txt/10 flex w-full justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <div className="text-fluid-lg w-fit rounded-full border p-1">
              <img src={TransparentLogoOnly} className="w-6" />
            </div>

            <h1 className="text-fluid-lg font-inter w-full text-start font-semibold">
              Add New Account
            </h1>
          </div>

          <button
            className="text-dark-txt/50 text-fluid-xl cursor-pointer"
            disabled={isAddBankPending}
            onClick={() => {
              setErrorMessage("");
              setShowModal(false);
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="w-full p-5">
          <form
            className="relative space-y-1 rounded-2xl"
            onSubmit={handleSubmit}
          >
            <CustomBankAvatar
              setErrorMessage={setErrorMessage}
              setImageCropped={setImage}
            />

            <p className="text-dark-txt/90 text-fluid-base mb-2">
              Account Name
            </p>

            <input
              type="text"
              value={bankName}
              placeholder="e.g. Example Account"
              className="ring-dark-background/10 focus:ring-dark-background text-fluid-sm w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
              onChange={(e) => setBankName(e.target.value)}
            />
            <p className="text-fluid-sm mb-2 text-red-400">{errorMessage}</p>

            <button
              disabled={isAddBankPending}
              className="bg-dark-background text-light-background hover:bg-dark-background/90 text-fluid-sm w-full cursor-pointer rounded-lg p-3 px-6 transition-colors ease-in-out"
            >
              {isAddBankPending ? "Loading..." : "Add Account"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BankAddModal;
