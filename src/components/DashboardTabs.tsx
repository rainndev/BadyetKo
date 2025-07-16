import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChartData from "./AreaChartData";
import useBreakpoints from "@/hooks/useBreakpoints";
import BankList from "./BankList";
import AllTransactionList from "./AllTransactionList";

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
            className="bg-muted text-fluid-sm overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            Volume
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="bg-muted text-fluid-sm overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            Accounts
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="bg-muted text-fluid-sm overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
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
