import { useState, Fragment } from "react";
import { useSession } from "../context/SessionContext";
import AreaChartData from "../components/AreaChartData";
import { useNetBalance } from "@/queries/useNetBalance";
import { useBank } from "@/hooks/useBank";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
import { CiWallet } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import BankListCard from "@/components/BankListCard";
import BankAddModal from "@/components/BankAddModal";

const DashboardPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { session } = useSession();

  const user_id = session?.user.id ?? "";

  //GET NET BALANCE
  const { data: userBalance } = useNetBalance(user_id);
  const totalBalance = userBalance?.[0].net_balance ?? 0;

  const {
    removeBank,
    bankList,
    isBankListError,
    bankListError,
    isBankListLoading,
  } = useBank(user_id);

  if (isBankListError)
    return (
      <div className="w-full min-h-screen p-10">{bankListError?.message}</div>
    );

  console.log(isShowModal);
  return (
    <>
      <BankAddModal
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        user_id={user_id}
      />

      <div className="w-full h-full flex flex-col p-10 m-5 rounded-3xl  bg-amber-300/10">
        <h1 className="text-3xl text-white">Dashboard</h1>
        <DashboardStatisticCard
          svg={<CiWallet />}
          amount={totalBalance}
          name="Net balance"
        />

        {/* Charts  */}
        <AreaChartData />

        {/* list data to render */}
        <ul className="mt-10 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {!isBankListLoading &&
            bankList?.map((bankItemData, idx: number) => (
              <Fragment key={bankItemData.id}>
                <BankListCard
                  bankItemData={bankItemData}
                  removeBank={removeBank}
                />

                {idx === bankList.length - 1 && (
                  <div
                    onClick={() => setShowModal(!isShowModal)}
                    className="bg-amber-300/10 text-white  flex flex-col items-center relative  justify-center p-10 rounded-lg"
                  >
                    <IoAdd className="text-xl" />
                    <p>Add more banks</p>
                  </div>
                )}
              </Fragment>
            ))}
        </ul>
      </div>
    </>
  );
};

export default DashboardPage;
