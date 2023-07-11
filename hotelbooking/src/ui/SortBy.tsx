import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({
  options,
}: {
  options: Array<{ value: string; label: string }>;
}) {
  const [searchParams, setsearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setsearchParams(searchParams);
  }
  return (
    <Select
      type="white"
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
}
export default SortBy;
