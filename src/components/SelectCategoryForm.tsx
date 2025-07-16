import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionCategory } from "@/hooks/useTransactionCategory";

type SelectCategoryFormProps = {
  setFormCategory: (value: string) => void;
};

const SelectCategoryForm = ({ setFormCategory }: SelectCategoryFormProps) => {
  const { categoryList, isCategoryListLoading, isCategoryEmpty } =
    useTransactionCategory();

  return (
    !isCategoryListLoading && (
      <Select
        disabled={isCategoryEmpty}
        onValueChange={(value) => setFormCategory(value)}
      >
        <SelectTrigger className="ring-dark-background/10 text-dark-txt/80 !text-fluid-sm w-full rounded-lg !p-6 !pl-3">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categoryList?.map((category) => (
            <SelectItem
              key={category.id}
              className="text-dark-txt/80 p-3"
              value={category.id}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  );
};

export default SelectCategoryForm;
