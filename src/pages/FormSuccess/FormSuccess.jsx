import { ContainerHeader, ContainerForm1 } from "./FormSuccess.styles";
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
      </ContainerHeader>
    </>
  );
};

export default FormSuccess;
