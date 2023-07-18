import {
  ContainerData,
  ContentForm,
  ContentInput,
  Person,
  ContentTitle,
  Title,
  ButtonAdd,
  InputCedula,
} from "./ChargedChild.styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useMediaQuery, useTheme } from "@mui/material";
import toast from "react-hot-toast";

const ChargedChild = () => {
  const {
    metadata,
    UpdateMetadata,
    index,
    AddFileData,
    validateChild,
    valueState,
    FileData,
  } = UserAuth();
  const [chargedResponse, setChargedResponse] = useState(null);
  const [chargedDiscapacity, setChargedDiscapacity] = useState(null);
  const [chargedCatastrofica, setChargedCatastrofica] = useState(null);
  const [chargedAge, setChargedAge] = useState(null);
  const [chargedWork, setChargedWork] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [fileChild, setFileChild] = useState(null);
  const [error, setError] = useState(false);
  const [valueIndex, setValueIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setChargedResponse(metadata?.metadataList[17]?.value);
    setChargedDiscapacity(metadata?.metadataList[18]?.value);
    setChargedCatastrofica(metadata?.metadataList[26]?.value);
    setChargedAge(metadata?.metadataList[19]?.value);
    setChargedWork(metadata?.metadataList[20]?.value);
  }, [metadata]);

  const handleValidate = () => {
    if (fileChild == null) {
      toast.error("Archivo Cedula Faltante");
    } else {
      if (inputValues) {
        validateChild(true);
        const dataConcat = inputValues.filter((value) => value !== "");
        const validItems = dataConcat.filter(
          ({ cedula, fechaNacimiento }) => cedula && fechaNacimiento
        );

        if (validItems.length === inputValues.length) {
          const convertedText = validItems
            .map(
              ({ cedula, fechaNacimiento }) => `${cedula} ${fechaNacimiento}`
            )
            .join(" - ");
          // console.log(convertedText);
          const hasConvertedText = metadata.metadataList.some((item) => {
            return (
              item.indexId === "d4aead7e-eed6-49cd-863f-bb5ce003db12" &&
              item.value.includes(convertedText)
            );
          });

          if (!hasConvertedText) {
            metadata.metadataList.map((item) => {
              if (item.indexId === "d4aead7e-eed6-49cd-863f-bb5ce003db12") {
                item.value = `${convertedText}`;
              }
              return item;
            });

            UpdateMetadata(metadata);
          }
        }

        inputValues.forEach((item) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result;
            const obj = {
              file: base64,
              nameFile: `${item.cedula} - ${item.fechaNacimiento}`,
              descriptionFile: `${item.cedula} - ${item.fechaNacimiento}`,
              fileTypeId: "86f9dfe7-086c-4ae6-a415-309b46d23fce",
              fileTypeName: "CEDULA HIJO",
              isRequired: false,
            };
            AddFileData(obj);
          };
          reader.readAsDataURL(item.file);
        });
      }
    }
  };

  const handleChange = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedResponse(value);
    value == "NO" && setChargedDiscapacity(null);
    value == "NO" && setChargedCatastrofica(null);
    value == "NO" && setChargedAge(null);
    value == "NO" && setChargedWork(null);
    value == "NO" && validateChild(true);
  };

  const handleDiscapacity = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedDiscapacity(value);
    value == "NO" && setChargedCatastrofica(null);
  };

  const handleCatastrofica = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedCatastrofica(value);
    validateChild(true);
  };

  const handleAge = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedAge(value);
    value == "NO" && setChargedWork(null);
    value == "NO" && validateChild(true);
  };

  const handleWorking = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedWork(value);
    value == "SI" && validateChild(true);
    value == "NO" && validateChild(false);
  };

  const handleSum = () => {
    setInputValues((prevValues) => [...prevValues, ""]);
  };

  const handleRes = () => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
    setError(null);
    setValueIndex(null);
  };

  const handleInputChange = (index, fieldName, value) => {
    if (fieldName == "fechaNacimiento") {
      const dateFormat = value.split("-");
      const dateToday = new Date();
      const year = dateToday.getFullYear();
      const restDate = parseInt(year) - parseInt(dateFormat[0]);
      console.log(restDate);
      if (restDate > 21) {
        setError("fecha invalida");
        setValueIndex(index);
      }
      if (restDate <= 21) {
        setError(null);
        setValueIndex(null);
      }
    }
    if (fieldName == "file") {
      setFileChild(value);
    }
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      if (!updatedValues[index]) {
        updatedValues[index] = {};
      }
      updatedValues[index][fieldName] = value;
      return updatedValues;
    });
  };

  const handleFile = (e) => {
    const File = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const obj = {
        file: base64,
        nameFile: "Certificado de enfermedad",
        descriptionFile: "Certificado de enfermedad",
        fileTypeId: "e08450da-1d88-4f53-9286-f97fd89e994b",
        fileTypeName:
          "CERTIFICADO O AVAL DE PADECER UNA ENFERMEDAD CATASTRÓFICA, RARA Y/O HUÉRFANA EMITIDO POR MSP O IESS",
        isRequired: false,
      };
      AddFileData(obj);
    };
    reader.readAsDataURL(File);
  };

  return (
    <ContainerData>
      <ContentForm>
        <ContentInput>
          <Person>
            <ContentTitle>
              <Title>REPORTE DE CARGAS (HIJOS)</Title>
            </ContentTitle>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Tiene cargas-tipo hijos? </label>
                <FormControl>
                  <RadioGroup
                    value={chargedResponse}
                    onClick={(e) => handleChange(e.target.value, e.target.id)}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="7e414783-d2da-45e0-bf65-de5f26e0c5c0" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="7e414783-d2da-45e0-bf65-de5f26e0c5c0" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>

            {chargedResponse == "SI" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Tiene discapacidad ?</label>
                <FormControl>
                  <RadioGroup
                    value={chargedDiscapacity}
                    onClick={(e) =>
                      handleDiscapacity(e.target.value, e.target.id)
                    }
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="5012fd7e-b064-4a2b-9986-80ee7380c912" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="5012fd7e-b064-4a2b-9986-80ee7380c912" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {chargedDiscapacity == "SI" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              >
                <label>
                  Certificado emitido por el Ministerio de Salud Pública o el
                  Instituto Ecuatoriano de Seguridad Social
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  onChange={handleFile}
                />
              </Box>
            )}

            {chargedDiscapacity == "SI" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Tiene enfermedad catastrofica?</label>
                <FormControl>
                  <RadioGroup
                    value={chargedCatastrofica}
                    onClick={(e) =>
                      handleCatastrofica(e.target.value, e.target.id)
                    }
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="22219ae4-884c-4896-a88a-9055d9fa15f0" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="22219ae4-884c-4896-a88a-9055d9fa15f0" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {chargedCatastrofica == "SI" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              >
                <label>
                  Certificado o aval de padecer una enfermedad catastrófica,
                  rara y/o huérfana emitido por el Ministerio de Salud Pública o
                  el Instituto Ecuatoriano de Seguridad Social
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  onChange={handleFile}
                />
              </Box>
            )}

            {chargedDiscapacity == "NO" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Menores de 21 años?</label>
                <FormControl>
                  <RadioGroup
                    value={chargedAge}
                    onClick={(e) => handleAge(e.target.value, e.target.id)}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="d69dda57-2847-4983-9a71-f102fc6bc891" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="d69dda57-2847-4983-9a71-f102fc6bc891" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {chargedAge == "SI" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>
                  Trabaja en relacion de dependencia o tiene actividad
                  economica?
                </label>
                <FormControl>
                  <RadioGroup
                    value={chargedWork}
                    onClick={(e) => handleWorking(e.target.value, e.target.id)}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="6876680b-d5ef-4978-b9fa-4abcfa7adca6" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="6876680b-d5ef-4978-b9fa-4abcfa7adca6" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {chargedWork == "NO" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              >
                <label>
                  Copia de la cédula de identidad de los hijos sin discapacidad
                  de hasta 21 años de edad dependientes del trabajador donde se
                  evidencie el parentesco.
                </label>
                <ButtonAdd onClick={() => handleSum()}>Añadir Hijo</ButtonAdd>
                <ButtonAdd onClick={() => handleRes()}>Eliminar Hijo</ButtonAdd>

                {inputValues.map((value, index) => (
                  <div key={index}>
                    <label>Cedula: </label>
                    <InputCedula
                      maxLength={10}
                      onChange={(e) =>
                        handleInputChange(index, "cedula", e.target.value)
                      }
                    />
                    <label>Fecha Nacimiento: </label>
                    {error && index == valueIndex && (
                      <label style={{ color: "red" }}>{error}</label>
                    )}
                    <InputCedula
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "fechaNacimiento",
                          e.target.value
                        )
                      }
                      type="date"
                    />

                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="file"
                      onChange={(e) =>
                        handleInputChange(index, "file", e.target.files[0])
                      }
                    />
                  </div>
                ))}
                {inputValues.length != 0 && error == null && (
                  <ButtonAdd onClick={() => handleValidate()}>
                    <input type="checkbox" checked={valueState} />
                    Validar
                  </ButtonAdd>
                )}
              </Box>
            )}
          </Person>
        </ContentInput>
      </ContentForm>
    </ContainerData>
  );
};

export default ChargedChild;
