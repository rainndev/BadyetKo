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
  const { categoryList, isCategoryListLoading } = useTransactionCategory();

  return (
    !isCategoryListLoading && (
      <Select onValueChange={(value) => setFormCategory(value)}>
        <SelectTrigger className="ring-dark-background/10 text-dark-txt/80 w-full rounded-lg !p-6 !pl-3 !text-[clamp(.6rem,1vw+.6rem,1rem)] ring">
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
