import { Switch } from "@/components/ui/switch";
import { useTransactionListStore } from "@/store/TransactionListStore";

const TransactionLabelSwitcher = () => {
  const isCategoryLabelEnabled = useTransactionListStore(
    (state) => state.isCategoryLabelEnabled,
  );
  const setCategoryLabelEnabled = useTransactionListStore(
    (state) => state.setCategoryLabelEnabled,
  );

  return (
    <div className="bg-dark-background/5 flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out">
      <h1 className="text-fluid-lg font-semibold">Category Label</h1>
      <p className="text-muted-foreground text-fluid-sm">
        Use a category label instead of a transaction note.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          className="!text-fluid-base cursor-pointer"
          onCheckedChange={() =>
            setCategoryLabelEnabled(!isCategoryLabelEnabled)
          }
          checked={isCategoryLabelEnabled}
          id="transaction-label-switcher"
        />
        <label
          className="hidden cursor-pointer text-nowrap @lg:block"
          htmlFor="transaction-label-switcher"
        >
          {isCategoryLabelEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default TransactionLabelSwitcher;
