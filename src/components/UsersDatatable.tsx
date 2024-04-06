import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegNewspaper, FaRegTrashAlt } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";

import DataTable, { createTheme } from "react-data-table-component";
import DatatableTheme from "./DatatableTheme";

import { GET_USERS } from "../api";

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

interface IProps {
  data: never[];
  setData: Dispatch<SetStateAction<never[]>>;
}

const UsersDatatable = ({ data, setData }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const columns = [
    {
      name: "Id",
      selector: (row: any) => row.id,
    },
    {
      name: "Nombres y Apellidos",
      selector: (row: any) => row.firstName + " " + row.lastName,
    },
    {
      name: "Foto",
      selector: (row: any) => (
        <>
          <img
            width={40}
            height={40}
            className="rounded-full"
            src={`${row.picture}`}
            alt={`${row.firstName + " " + row.lastName}`}
          />
        </>
      ),
    },
    {
      name: "Acciones",
      selector: (row: any) => (
        <div className="flex gap-4 ">
          <button
            className="px-2 py-1 rounded-md text-black"
            // onClick={() => {
            //   setUpdateId(row.id);
            // }}
          >
            <PiPencilSimpleLineFill />
          </button>
          <button
            className="px-2 py-1 bg-brand_primary rounded-md"
            // onClick={() => {
            //   RecipientDelete(row.id).then(()=>{
            //     feedDatatable();
            //   })
            // }}
          >
            <FaRegTrashAlt />
          </button>
          <button
            className="px-2 py-1 bg-brand_primary rounded-md"
            // onClick={() => {
            //   RecipientDelete(row.id).then(()=>{
            //     feedDatatable();
            //   })
            // }}
          >
            <FaRegNewspaper />
          </button>
        </div>
      ),
    },
  ];
  const fetchUsers = async (page: number, perPage: number) => {
    setLoading(true);
    GET_USERS(page, perPage).then((data) => {
      setData(data.data);
      setTotalRows(data.total);
      setLoading(false);
    });
  };
  const handlePageChange = (page: number) => {
    fetchUsers(page, perPage);
  };
  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setLoading(true);
    GET_USERS(page, newPerPage).then((data) => {
      setData(data.data);
      setPerPage(newPerPage);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers(1, perPage);
    createTheme("solarized", DatatableTheme, "light");
  }, []);

  return (
    <div className="border border-gray-200 rounded-md p-3">
      <DataTable
        theme="solarized"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={"Sin registros para mostrar"}
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};

export default UsersDatatable;
