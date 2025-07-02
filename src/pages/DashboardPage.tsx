import { useState } from "react";
import { useSession } from "../context/SessionContext";
import AreaChartData from "../components/AreaChartData";
import { useUserStatistic } from "@/queries/useUserStatistic";
import { useBank } from "@/hooks/useBank";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
import { CiWallet } from "react-icons/ci";
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";
import BankAddModal from "@/components/BankAddModal";
import BankRowData from "@/components/BankRowData";

const DashboardPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { session } = useSession();

  const user_id = session?.user.id ?? "";

  //GET NET BALANCE
  const { data: userStatistic, isLoading: isLoadingUserStatistic } =
    useUserStatistic(user_id);
  const total_balance = userStatistic?.[0].net_balance ?? 0;
  const total_deposit = userStatistic?.[0].total_deposit ?? 0;
  const total_withdraw = userStatistic?.[0].total_withdraw ?? 0;

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

  console.log("bankList length", bankList?.length === 0);

  return (
    <>
      <BankAddModal
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        user_id={user_id}
      />

      <div className="bg-light-background m-5 ml-0 flex h-full w-full flex-col rounded-3xl p-10">
        <h1 className="text-dark-txt my-5 text-3xl">Dashboard</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <DashboardStatisticCard
            svg={<CiWallet />}
            amount={total_balance}
            isLoading={isLoadingUserStatistic}
            name="Net balance"
          />
          <DashboardStatisticCard
            svg={<PiHandDepositLight />}
            amount={total_deposit}
            isLoading={isLoadingUserStatistic}
            name="Total Deposit"
          />
          <DashboardStatisticCard
            svg={<PiHandWithdrawLight />}
            amount={total_withdraw}
            isLoading={isLoadingUserStatistic}
            name="Total Withdraw"
          />
        </div>
        <br />
        {/* Charts  */}
        <AreaChartData />

        {/* list data to render */}
        <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-dark-background/20 overflow-x-auto rounded-2xl border p-5">
            {/* add bank wallet */}
            <div className="mb-5 flex items-center justify-between p-2">
              <h1 className="text-dark-txt text-[clamp(1rem, 2vw+1rem, 1.25rem)]">
                Bank wallets
              </h1>
              <button
                onClick={() => setShowModal(!isShowModal)}
                className="text-light-background bg-dark-background text-[clamp(1rem, 2vw+1rem, 1.25rem)] rounded-sm p-2 px-4 text-sm"
              >
                Add More Banks
              </button>
            </div>

            <table className="min-w-full border-collapse divide-y divide-gray-200">
              <tbody>
                {!isBankListLoading &&
                  bankList?.map((bankItemData) => (
                    <BankRowData
                      key={bankItemData.id}
                      bankItemData={bankItemData}
                      removeBank={removeBank}
                    />
                  ))}
              </tbody>
            </table>
          </div>

          <div className="border-dark-background/20 w-full rounded-2xl border p-2">
            test
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
