import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface option {
  value: string;
  label: string;
}

interface SortProps {
  options: Array<option>;
}

function SortBy({ options }: SortProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e: any) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
