import { Loader } from "./Loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { FaWindowClose } from "react-icons/fa";
import * as Yup from "yup";

interface IProps {
  setisOpenedModalUser: Dispatch<SetStateAction<boolean>>;
}

const ModalUser: React.FC<IProps> = ({ setisOpenedModalUser }) => {
  const handleSubmit = () => {};
  const initialValues = {};
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre Obligatorio"),
    lastname: Yup.string().required("Nombre Obligatorio"),
    picture: Yup.string().required("Nombre Obligatorio"),
    email: Yup.string().required("Nombre Obligatorio"),
    bith_date: Yup.string().required("Nombre Obligatorio"),
    phone: Yup.string().required("Nombre Obligatorio"),
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
                    setisOpenedModalUser(false);
                  }}
                >
                  <FaWindowClose className="text-brand_green  text-3xl" />
                </div>
                {errors.fromserver && (
                  <span className="bg-red-500 text-center w-full rounded-md text-white">
                    {errors.fromserver}
                  </span>
                )}
                <Field name="title" as="select">
                  <option value="mr">mr</option>
                  <option value="ms">ms</option>
                  <option value="mrs">mrs</option>
                  <option value="miss">miss</option>
                  <option value="dr">dr</option>
                </Field>

                <ErrorMessage
                  name="name"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"text"}
                  name="name"
                  placeholder="Nombres"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
                />

                <ErrorMessage
                  name="lastname"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"text"}
                  name="lastname"
                  placeholder="Apellidos"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
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
                />

                <Field name="gender" as="select">
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
                />

                <ErrorMessage
                  name="bith_date"
                  className="text-red-500"
                  component="span"
                />
                <Field
                  type={"date"}
                  name="bith_date"
                  placeholder="Fecha de nacimiento"
                  className="bg-zing-800 px-4 py-2 block mb-2 rounded-md border border-gray-200"
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
                />

                <button
                  type="submit"
                  className="bg-brand_green text-white px-4 py-2 disabled:opacity-75 rounded-md"
                  disabled={props.isSubmitting}
                >
                  Crear Usuario
                </button>
                {props.isSubmitting && <Loader />}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ModalUser;
