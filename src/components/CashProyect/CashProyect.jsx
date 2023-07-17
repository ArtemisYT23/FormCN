import {
  ContainerData,
  ContentForm,
  ContentInput,
  Person,
  ContentTitle,
  Title,
  InputCedula,
  ContentDeclaration,
  ButtonAdd,
  ContentButton,
} from "./CashProyect.styles";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  updateMetadataService,
  uploaderFiles,
  sendEmail,
} from "../../services";
import { useFetchAndLoad } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../types/route.types";
import { LoaderInfo } from "../../components";
import { useMediaQuery, useTheme } from "@mui/material";
import toast from "react-hot-toast";

const CashProyect = () => {
  const navigate = useNavigate();
  const { metadata, UpdateMetadata, cedula, FileData, Token } = UserAuth();
  const { callEndpoint } = useFetchAndLoad();
  const [numberFamily, setNumberFamily] = useState(0);
  const [basicFamily, setBasicFamily] = useState(0);
  const [cashHouse, setCashHouse] = useState(0);
  const [cashEducation, setCashEducation] = useState(0);
  const [cashSalud, setCashSalud] = useState(0);
  const [cashAliment, setCashAliment] = useState(0);
  const [cashVestiment, setCashVestiment] = useState(0);
  const [cashTurismo, setCashTurismo] = useState(0);
  const [cashTotal, setCashTotal] = useState(0);
  const [error, setError] = useState(null);
  const [stateConfirm, setStateConfirm] = useState(null);
  const [loading, setLoading] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setNumberFamily(metadata?.metadataList[5]?.value);
    setBasicFamily(metadata?.metadataList[6]?.value);
    setCashHouse(metadata?.metadataList[8]?.value);
    setCashEducation(metadata?.metadataList[9]?.value);
    setCashSalud(metadata?.metadataList[10]?.value);
    setCashAliment(metadata?.metadataList[12]?.value);
    setCashVestiment(metadata?.metadataList[11]?.value);
    setCashTurismo(metadata?.metadataList[13]?.value);
  }, [metadata]);

  useEffect(() => {
    if (numberFamily == 0) {
      setBasicFamily(7);
    }
    if (numberFamily == 1) {
      setBasicFamily(9);
    }
    if (numberFamily == 2) {
      setBasicFamily(11);
    }
    if (numberFamily == 3) {
      setBasicFamily(14);
    }
    if (numberFamily == 4) {
      setBasicFamily(17);
    }
    if (numberFamily >= 5) {
      setBasicFamily(20);
    }
  }, [numberFamily]);

  useEffect(() => {
    const sum =
      parseInt(cashHouse) +
      parseInt(cashEducation) +
      parseInt(cashSalud) +
      parseInt(cashAliment) +
      parseInt(cashVestiment) +
      parseInt(cashTurismo);

    if (numberFamily == 0) {
      if (sum <= 5353) {
        setCashTotal(sum);
        setError(null);
      }
      if (sum > 5353) {
        setCashTotal(0);
        setError("valor excedido");
      }
    }

    if (numberFamily == 1) {
      if (sum <= 6882) {
        setCashTotal(sum);
        setError(null);
      }
      if (sum > 6882) {
        setCashTotal(0);
        setError("valor excedido");
      }
    }

    if (numberFamily == 2) {
      if (sum <= 8412) {
        setCashTotal(sum);
        setError(null);
      }
      if (sum > 8412) {
        setCashTotal(0);
        setError("valor excedido");
      }
    }
    if (numberFamily == 3) {
      if (sum <= 10706) {
        setCashTotal(sum);
        setError(null);
      }
      if (sum > 10706) {
        setCashTotal(0);
        setError("valor excedido");
      }
    }
    if (numberFamily == 4) {
      if (sum <= 13000) {
        setCashTotal(sum);
        setError(null);
      }
      if (sum > 13000) {
        setCashTotal(0);
        setError("valor excedido");
      }
    }
    if (numberFamily >= 5) {
      if (sum <= 15294) {
        setCashTotal(sum);
        setError(null);
      }
      if (sum > 15294) {
        setCashTotal(0);
        setError("valor excedido");
      }
    }
  }, [
    numberFamily,
    cashHouse,
    cashEducation,
    cashSalud,
    cashAliment,
    cashVestiment,
    cashTurismo,
  ]);

  const handleChange = (value, indexId, event) => {
    event.preventDefault();
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
      if (item.indexId == "a2f16f1f-a7e7-4ece-98ea-f51d6b191eef") {
        item.value = `${basicFamily}`;
        return item;
      }
    });

    UpdateMetadata(metadata);
  };

  const handleSubmit = async () => {
    metadata.metadataList.map((item) => {
      if (item.indexId == "be881c58-e473-450d-a7eb-d9e1608c1a7f") {
        item.value = `${cashTotal}`;
        return item;
      }
    });

    const elementoModificar = metadata.metadataList.find(
      (item) => item.indexId === "5d37c043-51dd-4dc9-8b55-ddee3e20af83"
    );
    if (elementoModificar) {
      elementoModificar.value = parseInt(elementoModificar.value * 1);
    }

    const elementoList = metadata.metadataList.find(
      (item) => item.indexId === "5c13fe51-6d08-4b90-a141-f49956917770"
    );
    if (elementoList) {
      elementoList.value = parseInt(elementoList.value * 1);
    }

    UpdateMetadata(metadata);

    const metadataNew = {
      documentId: metadata?.documentId,
      metadata: metadata.metadataList,
    };

    const filesNew = {
      documentId: metadata?.documentId,
      fileData: FileData,
    };
    setLoading(true);
    try {
      const responseSesion = await callEndpoint(
        updateMetadataService(metadataNew, Token)
      );
      if (responseSesion.status == 200) {
        try {
          const responseFile = await callEndpoint(
            uploaderFiles(filesNew, Token)
          );
          if (responseFile.status == 200) {
            const responseEmail = await callEndpoint(sendEmail(cedula, Token));
            if (responseEmail.status == 200) {
              // console.log(responseEmail);
              toast.success(responseEmail.data);
              setLoading(false);
              navigate(`/authenticated/${PrivateRoutes.successForm}`);
            }
            
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleState = (value) => {
    setStateConfirm(value);
  };

  return (
    <ContainerData>
      <ContentForm>
        <ContentInput>
          <Person>
            <ContentTitle>
              <Title>GASTOS PROYECTADOS</Title>
            </ContentTitle>
            <label>
              Montos máximos para Gastos Personales según el número de cargas.
            </label>
            <table>
              <tbody>
                <td>Numero De Cargas</td>
                <td>Numero De canastas familiares básicas</td>
                <td>Máximo Deduccion</td>
              </tbody>
              <tr>
                <th>0</th>
                <th>7</th>
                <th>$ 5.353</th>
              </tr>
              <tr>
                <th>1</th>
                <th>9</th>
                <th>$ 6.882</th>
              </tr>
              <tr>
                <th>2</th>
                <th>11</th>
                <th>$ 8.412</th>
              </tr>
              <tr>
                <th>3</th>
                <th>14</th>
                <th>$ 10.706</th>
              </tr>
              <tr>
                <th>4</th>
                <th>17</th>
                <th>$ 13.000</th>
              </tr>
              <tr>
                <th>5 o mas</th>
                <th>20</th>
                <th>$ 15.294</th>
              </tr>
            </table>
            <Box
              sx={{
                width: isMobile ? 340 : 800,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 3,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              <h1 style={{ color: "red", fontSize: "20px" }}>
                MONTOS MAXIMOS PARA DEDUCCIÓN DE GASTOS PERSONALES
              </h1>
              <span style={{ color: "red", fontWeight: "bold" }}>
                Importante: Si debes reportar deducción por enfermedades
                catastróficas, raras y/o huerfanas por favor color `5` en el
                campo `Numero de Carga Familiares`
              </span>
            </Box>
            <Box
              sx={{
                width: isMobile ? 340 : 800,
                display: "flex",
                justifyContent: "center",
                marginTop: 3,
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Numero de Carga Familiares:</label>
                <InputCedula
                  type="number"
                  id="2acc5d8e-785b-498f-82e0-df223543b7a8"
                  onChange={(e) => {
                    setNumberFamily(e.target.value),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={numberFamily}
                />

                <label>Numero de canastas familiares basicas:</label>
                <InputCedula type="number" value={basicFamily} disabled />

                <label>Ingrese valor Gastos Vivienda:</label>
                <InputCedula
                  type="number"
                  id="e8984ac7-2b67-4d34-a7ff-038a0b3f0b1d"
                  onChange={(e) => {
                    setCashHouse(parseInt(e.target.value)),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={cashHouse}
                />

                <label>Ingrese valor Gastos Educación, Arte y Cultura:</label>
                <InputCedula
                  type="number"
                  id="05d2fa18-7721-445e-8f16-c3694cf0bf3e"
                  onChange={(e) => {
                    setCashEducation(parseInt(e.target.value)),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={cashEducation}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Ingrese valor Gastos de Salud:</label>
                <InputCedula
                  type="number"
                  id="5ea103a1-9504-4175-80e2-427226b3913b"
                  onChange={(e) => {
                    setCashSalud(parseInt(e.target.value)),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={cashSalud}
                />
                <label>Ingrese Valor Gastos Vestimenta:</label>
                <InputCedula
                  type="number"
                  id="fc46309f-5c5f-4730-af94-47ce3886ae3a"
                  onChange={(e) => {
                    setCashAliment(parseInt(e.target.value)),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={cashAliment}
                />
                <label>Ingrese Valor Gastos Alimentación:</label>
                <InputCedula
                  type="number"
                  id="f24cb179-a40e-43a7-8f98-6e48466a195b"
                  onChange={(e) => {
                    setCashVestiment(parseInt(e.target.value)),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={cashVestiment}
                />
                <label>Ingrese Valor Gastos Turismo Nacional:</label>
                <InputCedula
                  type="number"
                  id="75b34078-9f2b-473e-90a2-bffd4d381318"
                  onChange={(e) => {
                    setCashTurismo(parseInt(e.target.value)),
                      handleChange(e.target.value, e.target.id, e);
                  }}
                  value={cashTurismo}
                />
              </Box>
            </Box>
            <Box>
              <label>Gastos Totales: </label>
              {error != null && <label>{error}</label>}
              {error == null && <InputCedula value={cashTotal} disabled />}
            </Box>

            {error == null && cashTotal != 0 && (
              <ContentDeclaration>
                <div className="Declaration">
                  <label>
                    Yo, {metadata?.metadataList[1]?.value || " "} , con número
                    de cédula {cedula}, declaro que la información registrada y
                    adjunta es verdadera y esta será utilizada para el cálculo y
                    deducción de impuesto a la renta para el presente ejercicio
                    fiscal.
                  </label>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Aceptar Terminos Y Condiciones"
                    onChange={(e) => handleState(e.target.checked)}
                  />
                  {stateConfirm && (
                    <>
                      {loading ? (
                        <LoaderInfo />
                      ) : (
                        <ContentButton>
                          <ButtonAdd onClick={handleSubmit}>Guardar</ButtonAdd>
                        </ContentButton>
                      )}
                    </>
                  )}
                </div>
              </ContentDeclaration>
            )}
          </Person>
        </ContentInput>
      </ContentForm>
    </ContainerData>
  );
};

export default CashProyect;
