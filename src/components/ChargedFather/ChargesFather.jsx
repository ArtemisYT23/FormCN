import {
  ContainerData,
  ContentForm,
  ContentInput,
  Person,
  ContentTitle,
  Title,
  ButtonAdd,
  InputCedula,
} from "./ChargedFather.styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useMediaQuery, useTheme } from "@mui/material";
import { toast } from "react-hot-toast";

const ChargesFather = () => {
  const {
    metadata,
    UpdateMetadata,
    AddFileData,
    valueStateFather,
    validateFather,
  } = UserAuth();
  const [chargedResponse, setChargedResponse] = useState(null);
  const [chargedRelation, setChargedRelacion] = useState(null);
  const [chargedCatastrofica, setChargedCatastrofica] = useState(null);
  const [twoFather, setTwoFather] = useState(false);
  const [cedulaText, setCedulaText] = useState(null);
  const [dateText, setDataText] = useState(null);
  const [cedulaText2, setCedulaText2] = useState(null);
  const [dateText2, setDataText2] = useState(null);
  const [cedulaFile1, setCedulaFile1] = useState(null);
  const [cedulaFile2, setCedulaFile2] = useState(null);
  const [consentimientFile1, setConsentimientFile1] = useState(null);
  const [consentimientFile2, setConsentimientFile2] = useState(null);
  const [certificatedFile, setCertificatedFile] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setChargedResponse(metadata?.metadataList[21]?.value);
    setChargedRelacion(metadata?.metadataList[22]?.value);
    setChargedCatastrofica(metadata?.metadataList[23]?.value);
  }, [metadata]);

  const handleSubmit = () => {
    if (cedulaText != null && dateText != null) {
      const newInfo = `${cedulaText} - ${dateText}`;
      metadata.metadataList.map((item) => {
        if (item.indexId == "d4aead7e-eed6-49cd-863f-bb5ce003db12") {
          item.value = `${item.value}-${newInfo}`;
          return item;
        }
      });
      UpdateMetadata(metadata);
    }
    if (cedulaText2 != null && dateText2 != null) {
      const newInfo2 = `${cedulaText} - ${dateText}`;
      metadata.metadataList.map((item) => {
        if (item.indexId == "d4aead7e-eed6-49cd-863f-bb5ce003db12") {
          item.value = `${item.value}-${newInfo2}`;
          return item;
        }
      });
      UpdateMetadata(metadata);
    }

    if (cedulaText == null || dateText == null) {
      toast.error("Campos Requeridos faltantes");
    }

    if (cedulaText == "" || dateText == "") {
      toast.error("Campos Requeridos faltantes");
    }

    if (twoFather) {
      if (cedulaText2 == null && dateText2 == null) {
        toast.error("Campos Requeridos faltantes");
      }
      if (cedulaText2 == "" && dateText2 == "") {
        toast.error("Campos Requeridos faltantes");
      }
    }

    if (cedulaFile1 == null && chargedRelation == "NO") {
      toast.error("Archivos Sin Cargar Cedula Padre 1");
    }
    if (consentimientFile1 == null && chargedRelation == "NO") {
      toast.error("Archivos Sin Cargar Consentimiento 1");
    }
    if (twoFather) {
      if (cedulaFile2 == null && chargedRelation == "NO") {
        toast.error("Archivos Sin Cargar Cedula Padre 2");
      }
      if (consentimientFile2 == null && chargedRelation == "NO") {
        toast.error("Archivos Sin Cargar Consentimiento 2");
      }
    }
    if (certificatedFile == null && chargedCatastrofica == "SI") {
      toast.error("Archivos Sin Cargar Certificado");
    }

    if (
      cedulaText != null &&
      cedulaFile1 != null &&
      consentimientFile1 != null &&
      dateText != null &&
      certificatedFile != null &&
      chargedCatastrofica == "SI"
    ) {
      validateFather(true);
    }

    if (
      cedulaText != null &&
      cedulaFile1 != null &&
      consentimientFile1 != null &&
      dateText != null &&
      certificatedFile == null &&
      chargedCatastrofica == "NO"
    ) {
      validateFather(true);
    }

    if (twoFather) {
      if (
        cedulaFile2 != null &&
        consentimientFile2 != null &&
        cedulaText2 != null &&
        dateText2 != null &&
        certificatedFile != null &&
        chargedCatastrofica == "SI"
      ) {
        validateFather(true);
      }

      if (
        cedulaFile2 != null &&
        consentimientFile2 != null &&
        cedulaText2 != null &&
        dateText2 != null &&
        certificatedFile == null &&
        chargedCatastrofica == "NO"
      ) {
        validateFather(true);
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

    value == "NO" && validateFather(true);
    value == "SI" && validateFather(false);
  };

  const handleRelation = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedRelacion(value);
    value == "SI" && setChargedCatastrofica(null);
    value == "SI" && validateFather(true);
    value == "NO" && validateFather(false);
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
  };

  const handleClick = () => {
    setTwoFather(true);
  };

  const handleRes = () => {
    setTwoFather(false);
  };

  const handleCedula = (value) => {
    setCedulaText(value);
  };

  const handleDate = (value) => {
    setDataText(value);
  };

  const handleCedula2 = (value) => {
    setCedulaText2(value);
  };

  const handleDate2 = (value) => {
    setDataText2(value);
  };

  const handleFileCatastrofica = (e) => {
    const File = e.target.files[0];
    setCertificatedFile(File);
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

  const handleFileOne = (e) => {
    const File = e.target.files[0];
    setCedulaFile1(File);
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const obj = {
        file: base64,
        nameFile: `${cedulaText} - ${dateText}`,
        descriptionFile: `cedula padres: ${cedulaText} - ${dateText}`,
        fileTypeId: "cf68991d-0b0e-4016-b43d-ededbd64eb58",
        fileTypeName: "CEDULA PADRES",
        isRequired: false,
      };
      AddFileData(obj);
    };
    reader.readAsDataURL(File);
  };

  const handleFileTwo = (e) => {
    const File = e.target.files[0];
    setCedulaFile2(File);
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const obj = {
        file: base64,
        nameFile: `${cedulaText2} - ${dateText2}`,
        descriptionFile: `cedula padres 2 ${cedulaText2} - ${dateText2}`,
        fileTypeId: "cf68991d-0b0e-4016-b43d-ededbd64eb58",
        fileTypeName: "CEDULA PADRES",
        isRequired: false,
      };
      AddFileData(obj);
    };
    reader.readAsDataURL(File);
  };

  const handleFileTwoConsent = (e) => {
    const File = e.target.files[0];
    setConsentimientFile2(File);
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const obj = {
        file: base64,
        nameFile: `${cedulaText2} - ${dateText2}`,
        descriptionFile: `${cedulaText2} - ${dateText2}`,
        fileTypeId: "3bd5924d-08c8-4632-b2bc-17a69347fdde",
        fileTypeName: "CONSENTIMIENTO EXPRESO PADRES",
        isRequired: false,
      };
      AddFileData(obj);
    };
    reader.readAsDataURL(File);
  };

  const handleConsentimiento = (e) => {
    const File = e.target.files[0];
    setConsentimientFile1(File);
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const obj = {
        file: base64,
        nameFile: `${cedulaText} - ${dateText}`,
        descriptionFile: `${cedulaText} - ${dateText}`,
        fileTypeId: "3bd5924d-08c8-4632-b2bc-17a69347fdde",
        fileTypeName: "CONSENTIMIENTO EXPRESO PADRES",
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
              <Title>REPORTE DE CARGAS (PADRES)</Title>
            </ContentTitle>

            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Tiene cargas-tipo padres? </label>
                <FormControl>
                  <RadioGroup
                    value={chargedResponse}
                    onClick={(e) => handleChange(e.target.value, e.target.id)}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="ff05fbe1-8e37-4cb9-b4e5-af08eac3cecf" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="ff05fbe1-8e37-4cb9-b4e5-af08eac3cecf" />
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
                <label>
                  Trabaja en relacion de dependencia o tiene actividad
                  economica? ?
                </label>
                <FormControl>
                  <RadioGroup
                    value={chargedRelation}
                    onClick={(e) => handleRelation(e.target.value, e.target.id)}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="903ddd0d-5933-4656-81b7-ddef6ab4dd70" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="903ddd0d-5933-4656-81b7-ddef6ab4dd70" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {chargedRelation == "NO" && (
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
                  Consentimiento expreso para ser incluidos como carga familiar
                  del contribuyente y presentar copia de la cédula de identidad
                  donde se evidencie el parentesco
                </label>
                <label>Cedula: </label>
                <InputCedula
                  maxLength={10}
                  onChange={(e) => handleCedula(e.target.value)}
                />

                <label>Fecha Nacimiento: </label>
                <InputCedula
                  type="date"
                  onChange={(e) => handleDate(e.target.value)}
                />

                <label>Consentimiento: </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  onChange={handleConsentimiento}
                />

                <label>Copia de cedula: </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  onChange={handleFileOne}
                />
                <ButtonAdd onClick={() => handleClick()}>Añadir</ButtonAdd>

                {twoFather && (
                  <ButtonAdd onClick={() => handleRes()}>Eliminar</ButtonAdd>
                )}

                {twoFather && (
                  <>
                    <label>Cedula: </label>
                    <InputCedula
                      onChange={(e) => handleCedula2(e.target.value)}
                    />

                    <label>Fecha Nacimiento: </label>
                    <InputCedula
                      type="date"
                      onChange={(e) => handleDate2(e.target.value)}
                    />

                    <label>Consentimiento: </label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="file"
                      onChange={handleFileTwoConsent}
                    />

                    <label>Copia de cedula: </label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="file"
                      onChange={handleFileTwo}
                    />
                  </>
                )}
              </Box>
            )}

            {chargedRelation == "NO" && (
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
                        <Radio id="6d04883e-4fe3-4a17-9166-02f009948e7c" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="6d04883e-4fe3-4a17-9166-02f009948e7c" />
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
                  onChange={handleFileCatastrofica}
                />
              </Box>
            )}
            <Box
              sx={{
                width: isMobile ? 200 : 800,
                display: "flex",
                flexDirection: "column",
                marginTop: 2,
                marginBottom: 3,
              }}
            >
              {chargedCatastrofica == "SI" && (
                <ButtonAdd onClick={handleSubmit}>
                  <input type="checkbox" checked={valueStateFather} />
                  Validar
                </ButtonAdd>
              )}

              {chargedCatastrofica == "NO" && (
                <ButtonAdd onClick={handleSubmit}>
                  <input type="checkbox" checked={valueStateFather} />
                  Validar
                </ButtonAdd>
              )}
            </Box>
          </Person>
        </ContentInput>
      </ContentForm>
    </ContainerData>
  );
};

export default ChargesFather;
