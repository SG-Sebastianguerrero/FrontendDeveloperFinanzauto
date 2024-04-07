import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { Dispatch, SetStateAction } from "react";
import { FaWindowClose } from "react-icons/fa";
import * as Yup from "yup";
import { POST_USER, UPDATE_USER } from "../api";

export interface IModalUser {
  modalUser: {
    isopen: boolean;
    method: string;
    btnSubmitText: string;
    id: string;
  };
  setModalUser: Dispatch<
    SetStateAction<{
      isopen: boolean;
      method: string;
      btnSubmitText: string;
      id: string;
    }>
  >;
  initialValues?: FormikValues & {
    lastName: string;
    picture: string;
    email: string;
    bith_date: string;
    phone: string;
    title: string;
    gender: string;
  };
}

const ModalUser: React.FC<IModalUser> = ({
  setModalUser,
  modalUser,
  initialValues = {
    lastName: "",
    picture: "",
    email: "",
    bith_date: "",
    phone: "",
    title: "mr",
    gender: "female",
  },
}) => {
  const handleSubmit = (values: FormikValues, props: FormikValues) => {
    let { setErrors } = props;
    switch (modalUser.method) {
      case "POST":
        POST_USER(values)
          .then(({ data }) => {
            setModalUser({ ...modalUser, isopen: false });
            alert(`creado Satisfactoriamente con el ID ${data.id}`);
          })
          .catch((error) => {
            let { response } = error;
            let errorProp = response?.data?.data?.email || "Ocurrió un error";
            if (error instanceof Error) {
              setErrors({ fromserver: errorProp });
            }
          });
        break;

      case "PUT":
        UPDATE_USER(values.id, values)
          .then(({ data }) => {
            console.log(data);
            setModalUser({ ...modalUser, isopen: false });
            alert(`Actualizado Satisfactoriamente`);
          })
          .catch((error) => {
            let { response } = error;
            let errorProp = response?.data?.data?.email || "Ocurrió un error";
            if (error instanceof Error) {
              setErrors({ fromserver: errorProp });
            }
          });
        break;
      default:
        UPDATE_USER(values.id, values)
          .then(({ data }) => {
            console.log(data);
            setModalUser({ ...modalUser, isopen: false });
            alert(`Actualizado Satisfactoriamente`);
          })
          .catch((error) => {
            let { response } = error;
            let errorProp = response?.data?.data?.email || "Ocurrió un error";
            if (error instanceof Error) {
              setErrors({ fromserver: errorProp });
            }
          });
        break;
    }

    // console.log(props);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Nombre Obligatorio"),
    lastName: Yup.string().required("Apellido Obligatorio"),
    picture: Yup.string().required("Link Imagen Obligatorio"),
    email: Yup.string().required("Correo Obligatorio"),
    phone: Yup.string().required("Telefono Obligatorio"),
  });

  return (
    <div className="w-full h-screen flex justify-center top-0 fixed z-20 bg-[rgba(0,0,0,.3)]">
      <div className="h-auto w-full flex flex-col justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(props) => {
            let errors = props.errors as any;
            return (
              <Form className="flex flex-col gap-2 rounded-md border bg-white p-4 max-w-md w-96 h-128 h-auto">
                <div
                  className="w-full flex justify-end items-center hover:cursor-pointer"
                  onClick={() => {
                    setModalUser({ ...modalUser, isopen: false });
                  }}
                >
                  <FaWindowClose className="text-brand_green  text-3xl" />
                </div>
                {errors.fromserver && (
                  <span className="bg-red-500 text-center w-full rounded-md text-white">
                    {errors.fromserver}
                  </span>
                )}

                {initialValues?.id && (
                  <Field
                    type={"text"}
                    name="id"
                    placeholder="Id"
                    className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                    disabled
                  />
                )}

                <Field
                  name="title"
                  as="select"
                  className="px-2 py-2 border border-gray-200 rounded-full"
                  disabled={modalUser.method === "GET" ? true : false}
                >
                  <option value="mr">Señor</option>
                  <option value="ms">Sra</option>
                  <option value="mrs">Señora</option>
                  <option value="miss">Señorita</option>
                  <option value="dr">Doctor</option>
                </Field>

                <ErrorMessage
                  name="firstName"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"text"}
                  name="firstName"
                  placeholder="Nombres"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                  disabled={modalUser.method === "GET" ? true : false}
                />

                <ErrorMessage
                  name="lastName"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"text"}
                  name="lastName"
                  placeholder="Apellidos"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                  disabled={modalUser.method === "GET" ? true : false}
                />

                <ErrorMessage
                  name="picture"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"text"}
                  name="picture"
                  placeholder="URL imagen (Buscar en internet)"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                  disabled={modalUser.method === "GET" ? true : false}
                />

                <Field
                  name="gender"
                  as="select"
                  className="px-2 py-2 border border-gray-200 rounded-full"
                  disabled={modalUser.method === "GET" ? true : false}
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </Field>

                <ErrorMessage
                  name="email"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"email"}
                  name="email"
                  placeholder="Correo"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                  disabled={modalUser.method === "GET" ? true : false}
                />

                <ErrorMessage
                  name="phone"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"text"}
                  name="phone"
                  placeholder="Telefono"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                  disabled={modalUser.method === "GET" ? true : false}
                />

                <button
                  type="submit"
                  className="bg-brand_green text-white px-4 py-2 disabled:opacity-75 rounded-md"
                  disabled={modalUser.method === "GET" ? true : false}
                >
                  {modalUser.btnSubmitText}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ModalUser;
