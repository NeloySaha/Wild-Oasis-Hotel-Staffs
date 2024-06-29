import { PAGE_CONTENT_AMOUNT } from "../utils/constants";
import supabase from "./supabase";

export async function getGuests({ sortBy, page }) {
  let query = supabase
    .from("guests")
    .select("id, fullName, nationalID, countryFlag, nationality, email", {
      count: "exact",
    });

  // sortBy
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.order === "asc" });

  // pagination
  if (page) {
    const from = (page - 1) * PAGE_CONTENT_AMOUNT;
    const to = page * PAGE_CONTENT_AMOUNT - 1;

    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Guests could not be loaded");
  }

  return { data, count };
}
