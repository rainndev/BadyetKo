import CategoryAddForm from "@/components/CategoryAddForm";
import { TfiAnnouncement } from "react-icons/tfi";
import { useTransactionCategory } from "@/hooks/useTransactionCategory";
import { hexToRgba } from "@/utils/helper";

const CategoryPage = () => {
  const { categoryList, isCategoryListLoading } = useTransactionCategory();

  return (
    <div className="flex min-h-screen w-full flex-col items-start p-5 md:p-10">
      <CategoryAddForm />
      {/* render category */}

      <hr className="my-5 h-2 w-full" />
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {isCategoryListLoading && <p>Loading...</p>}
        {categoryList?.map((category) => (
          <div
            className="border-dark-background/10 flex w-full flex-col items-center gap-3 rounded-2xl border p-5 md:p-10"
            key={category.id}
          >
            <div
              style={{
                backgroundColor: hexToRgba(category.color || "#FFFFFF", 60),
              }}
              className="text-fluid-2xl w-fit min-w-10 rounded-full p-5 md:p-10"
            >
              <TfiAnnouncement />
            </div>

            <p className="text-fluid-base max-w-40 truncate text-center">
              {category.name}
            </p>
            {/* <p onClick={() => deleteCategory(category.id)}>X</p> */}
          </div>
        ))}
      </div>

      <div className="h-20" />
    </div>
  );
};

export default CategoryPage;
