import { useState } from "react";
import { useSession } from "../context/SessionContext";
import AreaChartData from "../components/AreaChartData";
import { useUserStatistic } from "@/queries/useUserStatistic";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
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
    TXStat,
    CategoryNetStat,
  } = useUserStatistic(user_id);

  console.log("raw", CategoryNetStat);

  return (
    <>
      <BankAddModal
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        user_id={user_id}
      />

      <div className="bg-light-background m-0 flex h-full w-full flex-col p-5 md:p-10 lg:rounded-[3rem]">
        <h1 className="text-dark-txt my-5 text-[clamp(.7rem,2vw+.7rem,1.5rem)] font-medium">
          Overview
        </h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <DashboardStatisticCard
            data={{
              total_balance,
              total_deposit,
              total_withdraw,
              TXStat: TXStat ?? [],
            }}
            isLoading={isLoadingUserStatistic}
          />
          <ChartPieDonut
            chartData={CategoryNetStat}
            isLoadingUserStatistic={isLoadingUserStatistic}
          />
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
