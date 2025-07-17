import { useSession } from "@/context/SessionContext";
import { useCategoryList } from "@/queries/useCategoryList";
import { useCreateCategory } from "@/queries/useCreateCategory";
import { useDeleteCategory } from "@/queries/useDeleteCategory";

export const useTransactionCategory = () => {
  const user_id = useSession().userID

  //hook for getting list of categories
  const { data: categoryList, error: categoryListError, isError: isCategoryList, isLoading: isCategoryListLoading  } = useCategoryList(user_id)

  const isCategoryEmpty =
    isCategoryListLoading || !categoryList || categoryList.length === 0;

  //hook for adding categories
  const {
    mutate: addCategory,
    isPending: isAddCategoryPending,
    isError: isAddCategoryError,
    isSuccess: isAddCategorySuccess,
    error: addCategoryError,
  } = useCreateCategory();

  //hook for deleting category
  const { mutate: deleteCategory, isPending: isDeleteCategoryPending, isError: isDeleteCategoryError,
    isSuccess: isDeleteCategorySuccess,
    error: deleteCategoryError } =
    useDeleteCategory();

  return {
   categoryList,
   categoryListError,
   isCategoryList,
   isCategoryListLoading,
   addCategory,
   isAddCategoryPending,
   isAddCategoryError,
   isAddCategorySuccess,
   addCategoryError,
   deleteCategory,
   isDeleteCategoryPending,
   isDeleteCategoryError,
   isDeleteCategorySuccess,
   deleteCategoryError,
   isCategoryEmpty
  };
};
