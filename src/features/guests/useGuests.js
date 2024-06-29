import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_CONTENT_AMOUNT } from "../../utils/constants";

export const useGuests = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, order] = sortByRaw.split("-");
  const sortBy = { field, order };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // FETCHING
  const {
    data: { data: guests, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests", page, sortBy],
    queryFn: () => getGuests({ sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_CONTENT_AMOUNT);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["guests", page + 1, sortBy],
      queryFn: () => getGuests({ sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["guests", page - 1, sortBy],
      queryFn: () => getGuests({ sortBy, page: page - 1 }),
    });
  }

  return { guests, isLoading, count, error };
};
