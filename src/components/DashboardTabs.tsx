import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChartData from "./AreaChartData";
import useBreakpoints from "@/hooks/useBreakpoints";
import BankList from "./BankList";
import AllTransactionList from "./AllTransactionList";
import { ChartArea, CreditCard, History } from "lucide-react";

type DashboardTabsProps = {
  isShowModal: boolean;
  setShowModal: (isShowModal: boolean) => void;
};

export default function DashboardTabs({
  isShowModal,
  setShowModal,
}: DashboardTabsProps) {
  const { isLarge } = useBreakpoints();

  return (
    !isLarge && (
      <Tabs defaultValue="tab-1">
        <TabsList className="before:bg-border relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
          <TabsTrigger
            value="tab-1"
            className="data-[state=active]:after:bg-primary text-fluid-sm relative flex-col rounded-none px-4 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <ChartArea
              className="mb-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Volume
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="data-[state=active]:after:bg-primary text-fluid-sm relative flex-col rounded-none px-4 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <CreditCard
              className="mb-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="data-[state=active]:after:bg-primary text-fluid-sm relative flex-col rounded-none px-4 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <History
              className="mb-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Recent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <AreaChartData />
        </TabsContent>
        <TabsContent value="tab-2">
          <BankList isShowModal={isShowModal} setShowModal={setShowModal} />
        </TabsContent>
        <TabsContent value="tab-3">
          <AllTransactionList />
        </TabsContent>
      </Tabs>
    )
  );
}
