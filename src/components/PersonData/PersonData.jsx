import {
  ContainerData,
  InputCedula,
  ContentForm,
  ContentTitle,
  Title,
  ContentInput,
  Person,
  Income,
} from "./PersonData.styles";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { LoaderInfo } from "../../components";

const PersonData = () => {
  const { metadata, UpdateMetadata, cedula } = UserAuth();
  const [nameValue, setValueName] = useState(null);
  const [emailValue, setValueEmail] = useState(null);
  const [ingresoValue, setIngresoValue] = useState(null);
  const [ingresoOtro, setIngreseOtro] = useState(null);
  const [charged, setCharged] = useState(null);

  useEffect(() => {
    setCharged(true);
    if (metadata != "") {
      setCharged(false);
      setValueName(metadata?.metadataList[1]?.value);
      setValueEmail(metadata?.metadataList[2]?.value);
      setIngresoValue(metadata?.metadataList[3]?.value);
      setIngreseOtro(metadata?.metadataList[4]?.value);
    }
  }, [metadata]);

  const handleChange = (e) => {
    const indexId = e.target.id;
    const metadataValue = e.target.value;

    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = metadataValue;
        return item;
      }

      if (item.indexId == "7e4fd422-8474-418e-85da-e4fa51205105") {
        item.value = cedula;
        return item;
      }
    });

    UpdateMetadata(metadata);
  };

  return (
    <ContainerData>
      {charged ? (
        <LoaderInfo />
      ) : (
        <ContentForm>
          <ContentInput>
            <Person>
              <ContentTitle>
                <Title>Datos personales</Title>
              </ContentTitle>
              <label>Cédula: </label>
              <InputCedula
                id="7e4fd422-8474-418e-85da-e4fa51205105"
                value={cedula}
                disabled
              />

              <label>Nombres Y Apellidos: </label>
              <InputCedula
                id="cc888264-0763-406c-aa01-9ed44cc53973"
                onChange={(e) => {
                  handleChange(e), setValueName(e.target.value);
                }}
                value={nameValue}
              />

              <label>Correo electrónico: </label>
              <InputCedula
                id="e8cfec5f-f3b7-48c9-a115-1bce52a297b4"
                onChange={(e) => {
                  handleChange(e), setValueEmail(e.target.value);
                }}
                value={emailValue}
              />
            </Person>
            <Income>
              <ContentTitle>
                <Title>Ingresos</Title>
              </ContentTitle>
              <label>Total de Ingresos con este empleador(Corresponde a su Ingreso Mensual multiplicado por 12): </label>
              <InputCedula
                id="5d37c043-51dd-4dc9-8b55-ddee3e20af83"
                onChange={(e) => {
                  handleChange(e), setIngresoValue(e.target.value);
                }}
                type="number"
                value={parseInt(ingresoValue)}
              />

              <label>Total de Ingresos con otros empleadores(Corresponde a su Ingreso Mensual multiplicado por 12): </label>
              <InputCedula
                id="5c13fe51-6d08-4b90-a141-f49956917770"
                onChange={(e) => {
                  handleChange(e), setIngreseOtro(e.target.value);
                }}
                type="number"
                value={parseInt(ingresoOtro)}
              />
            </Income>
          </ContentInput>
        </ContentForm>
      )}
    </ContainerData>
  );
};

export default PersonData;
