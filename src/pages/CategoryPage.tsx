import CategoryAddForm from "@/components/CategoryAddForm";
import { useTransactionCategory } from "@/hooks/useTransactionCategory";
import { hexToRgba } from "@/utils/helper";
import { categoryIconMap } from "@/data/categoryIcon";
import { CircleOff } from "lucide-react";
import CategoryCardPlaceholder from "@/components/CategoryCardPlaceholder";

const CategoryPage = () => {
  const { categoryList, isCategoryListLoading } = useTransactionCategory();

  return (
    <div className="flex min-h-screen w-full flex-col items-start p-5 md:p-10">
      <CategoryAddForm />

      {/* render category */}
      <hr className="my-5 h-2 w-full" />
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {/* loading card */}
        {isCategoryListLoading && <CategoryCardPlaceholder />}
        {categoryList?.map(({ id, icon_id, color, name }) => {
          const CategoryIcon =
            categoryIconMap[icon_id as keyof typeof categoryIconMap] ||
            CircleOff;
          return (
            <div
              className="border-dark-background/10 flex w-full flex-col items-center gap-3 rounded-2xl border p-5"
              key={id}
            >
              <div
                style={{
                  backgroundColor: hexToRgba(color || "#FFFFFF", 15),
                  border: "1px solid",
                  borderColor: color || "#FFFFFF",
                  color: color || "#FFFFFF",
                }}
                className="w-fit rounded-full p-3 md:p-4"
              >
                <CategoryIcon className="size-5" />
              </div>

              <p className="text-fluid-base max-w-full truncate text-center">
                {name}
              </p>
              {/* <p onClick={() => deleteCategory(category.id)}>X</p> */}
            </div>
          );
        })}
      </div>

      <div className="h-20" />
    </div>
  );
};

export default CategoryPage;
