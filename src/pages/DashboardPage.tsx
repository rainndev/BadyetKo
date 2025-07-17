import { useState } from "react";
import AreaChartData from "../components/AreaChartData";
import DashboardStatisticCard from "@/components/DashboardStatisticCard";
import BankAddModal from "@/components/BankAddModal";
import AllTransactionList from "@/components/AllTransactionList";
import BankList from "@/components/BankList";
import ChartPieDonut from "@/components/ChartPieDonut";
import useBreakpoints from "@/hooks/useBreakpoints";
import DashboardTabs from "@/components/DashboardTabs";
import { AnimatePresence } from "framer-motion";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
const DashboardPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { isLarge } = useBreakpoints();
  //Lock the body when showing modal
  useBodyScrollLock(isShowModal);
  return (
    <>
      <AnimatePresence>
        {isShowModal && <BankAddModal setShowModal={setShowModal} />}
      </AnimatePresence>

      <div className="bg-light-background m-0 flex h-full w-full flex-col p-5 md:p-10 lg:rounded-[3rem]">
        <h1 className="text-dark-txt text-fluid-lg my-5 font-medium">
          Overview
        </h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <DashboardStatisticCard />
          <ChartPieDonut />
        </div>
        <br />
        <DashboardTabs isShowModal={isShowModal} setShowModal={setShowModal} />
        {/* Charts  */}
        {isLarge && <AreaChartData />}

        {/* list data to render */}
        {isLarge && (
          <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Bank list  */}
            <BankList isShowModal={isShowModal} setShowModal={setShowModal} />

            {/* All transaction list */}
            <AllTransactionList />
          </div>
        )}
        <div className="h-20" />
      </div>
    </>
  );
};

export default DashboardPage;
