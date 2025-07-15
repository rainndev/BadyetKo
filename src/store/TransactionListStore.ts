import { create } from "zustand";
import { persist } from "zustand/middleware";

type useTransactionListStoreProps = {
isCategoryLabelEnabled: boolean;
setCategoryLabelEnabled: (isCategoryLabelEnabled:boolean) => void;
}

export const useTransactionListStore = create<useTransactionListStoreProps>()(
  persist(
    (set) => ({
      isCategoryLabelEnabled: false,
      setCategoryLabelEnabled: (isCategoryLabelEnabled) => set({ isCategoryLabelEnabled })
    }),
    {
      name: "transaction-list-store",
    },
  ),
);
