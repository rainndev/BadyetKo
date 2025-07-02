import { useState } from "react";
import { useSession } from "../context/SessionContext";
import AreaChartData from "../components/AreaChartData";
import { useUserStatistic } from "@/queries/useUserStatistic";
import { useBank } from "@/hooks/useBank";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
import { CiWallet } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
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

      <div className="bg-light-background m-0 flex h-full w-full flex-col rounded-3xl p-5 md:m-5 md:ml-0 md:p-10">
        <h1 className="text-dark-txt my-5 text-[clamp(.7rem,2vw+.7rem,1.5rem)] font-medium">
          Dashboard
        </h1>
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
          <div className="border-dark-background/20 rounded-2xl border p-5">
            {/* add bank wallet */}
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-dark-txt text-[clamp(.6rem,2vw+.6rem,1.25rem)] font-medium">
                Bank wallets
              </h1>
              <button
                onClick={() => setShowModal(!isShowModal)}
                className="text-light-background bg-dark-background hidden rounded-sm p-2 px-4 text-sm text-[clamp(.8rem,2vw+.8rem,.9rem)] lg:flex lg:items-center lg:justify-center lg:space-x-2"
              >
                <span>Add More Banks</span>
              </button>
              <button className="text-light-background bg-dark-background rounded-xl p-3 text-xs lg:hidden">
                <FaPlus onClick={() => setShowModal(!isShowModal)} />
              </button>
            </div>
            <div className="w-full overflow-x-auto">
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
          </div>

          <div className="border-dark-background/20 w-full rounded-2xl border p-2">
            test
          </div>
          <div className="h-20" />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
