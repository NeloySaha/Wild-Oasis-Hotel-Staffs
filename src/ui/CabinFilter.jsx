import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import SpinnerMini from "./SpinnerMini";
import { useCabins } from "../features/cabins/useCabins";

function CabinFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingsForCabin = searchParams.get("cabin") || "all";

  const { cabins, isLoading } = useCabins();
  const cabinOptions =
    cabins?.map((cabin) => {
      return {
        value: cabin.id,
        label: `Cabin ${cabin.name}`,
      };
    }) || [];
  const options = [{ value: "all", label: "All Cabins" }, ...cabinOptions];

  function handleChange(e) {
    searchParams.set("cabin", e.target.value);
    setSearchParams(searchParams);
  }

  if (isLoading) return <SpinnerMini />;

  return (
    <Select
      options={options}
      value={bookingsForCabin}
      type="white"
      onChange={handleChange}
    />
  );
}

export default CabinFilter;
