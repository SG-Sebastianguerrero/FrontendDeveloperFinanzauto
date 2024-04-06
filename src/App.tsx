import { useState } from "react";
import DatatableSearch from "./components/DatatableSearch";
import Navbar from "./components/Navbar";
import UsersDatatable from "./components/UsersDatatable";
import ModalUser from "./components/ModalUser";

function App() {
  const [data, setData] = useState([]);
  const [isOpenedModalUser, setisOpenedModalUser] = useState(false);
  return (
    <>
      <Navbar />
      {isOpenedModalUser && (
        <ModalUser setisOpenedModalUser={setisOpenedModalUser} />
      )}
      <main className="relative w-full h-auto min-h-screen p-5 mt-20">
        <div className="w-full flex justify-end gap-5 items-center mb-3">
          <DatatableSearch data={data} setData={setData} />
          <button
            className="p-2 rounded-sm text-white bg-brand_green"
            onClick={() => setisOpenedModalUser(true)}
          >
            Crear Usuario
          </button>
        </div>
        <UsersDatatable data={data} setData={setData} />
      </main>
    </>
  );
}

export default App;
