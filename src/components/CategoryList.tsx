import { useTransactionCategory } from "@/hooks/useTransactionCategory";
import {
  categorySchema,
  type categorySchemaType,
} from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const CategoryList = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const {
    isAddCategoryPending,
    addCategory,
    categoryList,
    isCategoryListLoading,
    deleteCategory,
  } = useTransactionCategory();

  const onSubmit: SubmitHandler<categorySchemaType> = (data) => {
    addCategory({ categoryName: data.name });
    console.log("category name", data.name);
    reset();
  };

  return (
    <div className="my-5 w-full border p-10">
      {/* form for adding category */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
            Category Name
          </p>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="e.g. Food"
            className="ring-dark-background/10 focus:ring-dark-background w-fit rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isAddCategoryPending}
          className="bg-dark-background hover:bg-dark-background/90 text-light-background mt-5 cursor-pointer rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)] transition-colors ease-in-out"
        >
          {isAddCategoryPending ? "Loading..." : "Add Category"}
        </button>
      </form>

      {/* render category */}
      <ul className="mt-5 flex flex-col gap-2">
        {isCategoryListLoading && <p>Loading...</p>}
        {categoryList?.map((category) => (
          <li
            className="bg-dark-background/10 flex w-fit gap-5 rounded-lg p-2"
            key={category.id}
          >
            <span>{category.name}</span>

            <span onClick={() => deleteCategory(category.id)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
