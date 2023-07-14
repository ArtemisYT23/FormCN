import { ContainerHeader, ContainerForm1 } from "./FormSuccess.styles";
import { Toaster } from "react-hot-toast";
import "./FormSucess.css";

const FormSuccess = () => {
  return (
    <>
      <ContainerHeader>
        <ContainerForm1>
          <div className="Iam">
            <p>Formulario Enviado</p>
            <p>Con Éxito</p>
            <b>
              <div className="innerIam">
                CERVECERIA NACIONAL
                <br />
                CERVECERIA NACIONAL
                <br />
                CERVECERIA NACIONAL
                <br />
                CERVECERIA NACIONAL
                <br />
                CERVECERIA NACIONAL
                {/* Somos Especialistas
                <br />
                Su Aliado en la
                <br />
                Unidad
                <br />
                de bebidas */}
              </div>
            </b>
          </div>
        </ContainerForm1>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            duration: 3500,
            style: {
              background: "#f70707",
              color: "#fff",
            },
          }}
        />
      </ContainerHeader>
    </>
  );
};

export default FormSuccess;
