import { useState } from "react";
import { useSession } from "../context/SessionContext";
import AreaChartData from "../components/AreaChartData";
import { useUserStatistic } from "@/queries/useUserStatistic";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
import { CiWallet } from "react-icons/ci";
import BankAddModal from "@/components/BankAddModal";
import AllTransactionList from "@/components/AllTransactionList";
import BankList from "@/components/BankList";
import ChartPieDonut from "@/components/ChartPieDonut";

const DashboardPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { session } = useSession();
  const user_id = session?.user.id ?? "";

  //GET NET BALANCE
  const {
    total_balance,
    total_deposit,
    total_withdraw,
    isLoadingUserStatistic,
  } = useUserStatistic(user_id);

  const chartData = [
    {
      type: "deposit",
      amount: total_deposit,
      fill: "var(--color-chart-deposit)",
    },
    {
      type: "withdraw",
      amount: total_withdraw,
      fill: "var(--color-chart-withdraw)",
    },
  ];

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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <DashboardStatisticCard
            svg={<CiWallet className="text-[clamp(1rem,2vw+1rem,1.875rem)]" />}
            amount={total_balance}
            isLoading={isLoadingUserStatistic}
            name="Net balance"
          />
          <ChartPieDonut chartData={chartData} />
        </div>
        <br />
        {/* Charts  */}
        <AreaChartData />

        {/* list data to render */}
        <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Bank list  */}
          <BankList
            isShowModal={isShowModal}
            setShowModal={setShowModal}
            user_id={user_id}
          />

          {/* All transaction list */}
          <AllTransactionList />
          <div className="h-20" />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
