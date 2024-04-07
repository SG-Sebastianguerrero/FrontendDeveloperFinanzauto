import { useState } from "react";
import DatatableSearch from "./components/DatatableSearch";
import Navbar from "./components/Navbar";
import UsersDatatable from "./components/UsersDatatable";
import ModalUser from "./components/ModalUser";

function App() {
  const [data, setData] = useState([]);
  const [modalUser, setModalUser] = useState({
    isopen: false,
    method: "",
    btnSubmitText: "",
    id: "",
  });
  const [initialValues, setInitialValues] = useState({
    lastName: "",
    picture: "",
    email: "",
    bith_date: "",
    phone: "",
    title: "mr",
    gender: "female",
  });

  function openModalUserWithPost() {
    setModalUser({
      ...modalUser,
      isopen: true,
      method: "POST",
      btnSubmitText: "Crear Usuario",
    });
    setInitialValues({
      lastName: "",
      picture: "",
      email: "",
      bith_date: "",
      phone: "",
      title: "mr",
      gender: "female",
    });
  }

  return (
    <>
      <Navbar />
      {modalUser.isopen && (
        <ModalUser
          setModalUser={setModalUser}
          modalUser={modalUser}
          initialValues={initialValues}
        />
      )}
      <main className="relative w-full h-auto min-h-screen p-5 mt-20">
        <div className="w-full flex justify-end gap-5 items-center mb-3">
          <DatatableSearch data={data} setData={setData} />
          <button
            className="p-2 rounded-sm text-white bg-brand_green"
            onClick={openModalUserWithPost}
          >
            Crear Usuario
          </button>
        </div>
        <UsersDatatable
          data={data}
          setData={setData}
          modalUser={modalUser}
          setModalUser={setModalUser}
          setInitialValues={setInitialValues}
        />
      </main>
    </>
  );
}

export default App;
