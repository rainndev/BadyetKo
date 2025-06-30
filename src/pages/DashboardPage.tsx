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
      <div className="min-h-screen w-full p-10">{bankListError?.message}</div>
    );

  return (
    <>
      <BankAddModal
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        user_id={user_id}
      />

      <div className="bg-light-background m-5 flex h-full w-full flex-col rounded-3xl p-10">
        <h1 className="text-dark-txt my-5 text-3xl">Dashboard</h1>
        <DashboardStatisticCard
          svg={<CiWallet />}
          amount={totalBalance}
          name="Net balance"
        />
        <br />
        {/* Charts  */}
        <AreaChartData />

        <h1 className="text-dark-txt mt-10 mb-5 text-xl">Bank wallets</h1>

        {/* list data to render */}
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                    className="border-dark-background/10 bg-dark-background/3 text-dark-txt relative flex flex-col items-center justify-center rounded-lg border p-10"
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
