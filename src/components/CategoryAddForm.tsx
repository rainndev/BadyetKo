import { useTransactionCategory } from "@/hooks/useTransactionCategory";
import { FaPlus } from "react-icons/fa6";
import {
  categorySchema,
  type categorySchemaType,
} from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const CategoryAddForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const { isAddCategoryPending, addCategory } = useTransactionCategory();

  const onSubmit: SubmitHandler<categorySchemaType> = (data) => {
    addCategory({ categoryName: data.name });
    console.log("category name", data.name);
    reset();
  };

  return (
    <div className="w-full">
      {/* form for adding category */}
      <form
        className="flex items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
            Category Name
          </p>
          <div className="flex items-center gap-2">
            <div className="w-full">
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="e.g. Food"
                className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isAddCategoryPending}
              className="bg-dark-background hover:bg-dark-background/90 text-light-background flex cursor-pointer items-center justify-center gap-2 rounded-xl p-4 text-xs text-[clamp(.6rem,1vw+.6rem,1rem)] text-nowrap transition-colors ease-in-out md:rounded-lg md:px-6"
            >
              <span className="hidden lg:block">
                {isAddCategoryPending ? "Loading..." : "Add Category"}
              </span>
              <FaPlus />
            </button>
          </div>
        </div>
      </form>

      {/* colors */}
    </div>
  );
};

export default CategoryAddForm;
