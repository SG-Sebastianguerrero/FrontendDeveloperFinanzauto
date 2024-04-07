import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Datum } from "../interfaces";
import { GET_USER } from "../api";

interface IProps {
  data: never[];
  setData: Dispatch<SetStateAction<never[]>>;
}

const DatatableSearch: React.FC<IProps> = ({ data, setData }) => {
  const [search, setSearch] = useState<string>("");
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [dataOriginal, setDataOriginal] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    setDataOriginal(data);
  }, []);

  useEffect(() => {
    if (search.trim() === "" || search.length === 0) {
      setData(dataOriginal);
      setIsUserNotFound(false);
    } else {
      GET_USER(search)
        .then((user: Datum) => {
          let result: any = [user];
          setData(result);
          setIsUserNotFound(false);
        })
        .catch(() => setIsUserNotFound(true));
    }
  }, [search]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex relative items-center justify-center gap-3 bg-white border border-gray-200 m-0 rounded-md">
        <FaSearch className="absolute left-2 z-[1] text-gray-200" />
        <input
          type="search"
          className="relative py-2 pl-7 pr-5 rounded-md"
          placeholder="Id a buscar"
          aria-label="Search"
          onChange={handleSearch}
        />
      </div>
      {data.length === 0 && search !== "" && (
        <span className="text-red-400">Sin Resultados</span>
      )}
      {isUserNotFound && <span className="text-red-400">No encontrado</span>}
    </div>
  );
};

export default DatatableSearch;
