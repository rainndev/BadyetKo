import { useState, Fragment } from "react";
import { useSession } from "../context/SessionContext";
import AreaChartData from "../components/AreaChartData";
import { useUserStatistic } from "@/queries/useUserStatistic";
import { useBank } from "@/hooks/useBank";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
import { CiWallet } from "react-icons/ci";
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";
import { IoAdd } from "react-icons/io5";
import BankListCard from "@/components/BankListCard";
import BankAddModal from "@/components/BankAddModal";

const DashboardPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { session } = useSession();

  const user_id = session?.user.id ?? "";

  //GET NET BALANCE
  const { data: userStatistic } = useUserStatistic(user_id);
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

      <div className="bg-light-background m-5 flex h-full w-full flex-col rounded-3xl p-10">
        <h1 className="text-dark-txt my-5 text-3xl">Dashboard</h1>
        <div className="flex gap-2">
          <DashboardStatisticCard
            svg={<CiWallet />}
            amount={total_balance}
            name="Net balance"
          />
          <DashboardStatisticCard
            svg={<PiHandDepositLight />}
            amount={total_deposit}
            name="Total Deposit"
          />
          <DashboardStatisticCard
            svg={<PiHandWithdrawLight />}
            amount={total_withdraw}
            name="Total Withdraw"
          />
        </div>

        <br />
        {/* Charts  */}
        <AreaChartData />

        <h1 className="text-dark-txt mt-10 mb-5 text-xl">Bank wallets</h1>

        {/* list data to render */}
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {!isBankListLoading &&
            bankList?.map((bankItemData) => (
              <Fragment key={bankItemData.id}>
                <BankListCard
                  bankItemData={bankItemData}
                  removeBank={removeBank}
                />
              </Fragment>
            ))}

          <div
            onClick={() => setShowModal(!isShowModal)}
            className="border-dark-background/10 bg-dark-background/3 text-dark-txt relative flex flex-col items-center justify-center rounded-lg border p-10"
          >
            <IoAdd className="text-xl" />
            <p>Add more banks</p>
          </div>
        </ul>
      </div>
    </>
  );
};

export default DashboardPage;
