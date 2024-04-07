import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegNewspaper, FaRegTrashAlt } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";

import DataTable, { createTheme } from "react-data-table-component";
import DatatableTheme from "./DatatableTheme";

import { DELETE_USER, GET_USER, GET_USERS } from "../api";
import { IModalUser } from "./ModalUser";

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

interface IProps {
  data: never[];
  setData: Dispatch<SetStateAction<never[]>>;
  setInitialValues: Dispatch<
    SetStateAction<{
      lastName: string;
      picture: string;
      email: string;
      bith_date: string;
      phone: string;
      title: string;
      gender: string;
    }>
  >;
}

const UsersDatatable = ({
  data,
  setData,
  setModalUser,
  setInitialValues,
}: IProps & IModalUser) => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

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
            onClick={() => {
              setModalUser({
                isopen: true,
                method: "PUT",
                btnSubmitText: "Actualizar Usuario",
                id: row.id,
              });
              GET_USER(row.id).then((user) => {
                setInitialValues(user);
              });
            }}
          >
            <PiPencilSimpleLineFill />
          </button>

          <button
            className="px-2 py-1 rounded-md"
            onClick={() => {
              let confirmation: boolean = confirm(
                "Seguro que desea eliminar ?"
              );
              if (confirmation) {
                DELETE_USER(row.id)
                  .then(() => {
                    alert("Eliminado Exitosamente");
                    fetchUsers(1, perPage);
                  })
                  .catch(console.error);
              }
            }}
          >
            <FaRegTrashAlt />
          </button>

          <button
            className="px-2 py-1 rounded-md"
            onClick={() => {
              setModalUser({
                isopen: true,
                method: "GET",
                btnSubmitText: "Usuario",
                id: row.id,
              });
              GET_USER(row.id).then((user) => {
                setInitialValues(user);
              });
            }}
          >
            <FaRegNewspaper />
          </button>
        </div>
      ),
    },
  ];

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
