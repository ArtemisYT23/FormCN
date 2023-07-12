import {
  ContainerHeader,
  ContainerInfo,
  ContentLine,
  Introducction,
  AditionalInformation,
} from "./BodyDescription.styles";

const BodyDescription = () => {
  const requiredChar = "*";
  return (
    <ContainerHeader>
      <ContainerInfo>
        <ContentLine>
          <Introducction>
            Dando cumplimiento a la vigente Ley Orgánica de Protección de Datos
            Personales del Ecuador autorizas a Cervecería Nacional CN S.A.,
            Dinadec S.A. y a TADA Ecuador S.A.S., para que puedan tratar tus
            datos personales, suministrados de manera libre y voluntaria, a
            través del siguiente form, para el cumplimiento de una obligación
            legal, derivada de la relación laboral que mantienes con las
            empresas mencionadas previamente, conforme a nuestra política de
            protección de datos personales que ya conoces.
            Para mayor información y consultas sobre nuestra política de
            protección de datos puede dirigirlas a
            protecciondatosecuador@ab-inbev.com, y nuestra política puede ser
            consultada en
            <a
              target="blank"
              href="https://www.cervecerianacional.ec/empresa/nuestras-pol%C3%ADticas-corporativas"
            >
              https://www.cervecerianacional.ec/empresa/nuestras-pol%C3%ADticas-corporativas.
            </a>
          </Introducction>

          <AditionalInformation>
            Todos los campos {requiredChar} son obligatorios
          </AditionalInformation>
        </ContentLine>
      </ContainerInfo>
    </ContainerHeader>
  );
};

export default BodyDescription;
