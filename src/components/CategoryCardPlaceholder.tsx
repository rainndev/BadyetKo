import { CircleOff } from "lucide-react";

const CategoryCardPlaceholder = () => {
  return [...Array(5)].map((_, idx) => (
    <div
      key={"category-card" + idx}
      className="bg-dark-background/50 flex w-full animate-pulse flex-col items-center gap-3 rounded-2xl border p-5"
    >
      <div className="invisible w-fit rounded-full p-3 md:p-4">
        <CircleOff className="size-5" />
      </div>

      <p className="text-fluid-base invisible max-w-full truncate text-center">
        test name
      </p>
      {/* <p onClick={() => deleteCategory(category.id)}>X</p> */}
    </div>
  ));
};

export default CategoryCardPlaceholder;
