import {
  ContainerData,
  ContentForm,
  ContentInput,
  Person,
  ContentTitle,
  Title,
  InputCedula,
} from "./ChargedSpouse.styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

const ChargedSpouse = () => {
  const { metadata, UpdateMetadata, AddFileData } = UserAuth();
  const [chargedResponse, setChargedResponse] = useState(null);
  const [chargedRelation, setChargedRelation] = useState(null);
  const [chargedCertification, setChargedCertification] = useState(null);
  const [cedulaText, setCedulaText] = useState(null);
  const [dateText, setDataText] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setChargedResponse(metadata?.metadataList[14]?.value);
    setChargedRelation(metadata?.metadataList[15]?.value);
    setChargedCertification(metadata?.metadataList[16]?.value);
  }, [metadata]);

  useEffect(() => {
    if (cedulaText != null && dateText != null) {
      const newInfo = `${cedulaText} - ${dateText}`;
      metadata.metadataList.map((item) => {
        if (item.indexId == "d4aead7e-eed6-49cd-863f-bb5ce003db12") {
          item.value = newInfo;
          return item;
        }
      });
      UpdateMetadata(metadata);
    }
  }, [cedulaText, dateText]);

  const handleChange = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedResponse(value);
    value == "NO" && setChargedRelation(null);
    value == "NO" && setChargedCertification(null);
  };

  const handleRelation = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });
    UpdateMetadata(metadata);
    setChargedRelation(value);
  };

  const handleCertification = (value, indexId) => {
    metadata.metadataList.map((item) => {
      if (item.indexId == indexId) {
        item.value = value;
        return item;
      }
    });

    UpdateMetadata(metadata);
    setChargedCertification(value);
  };

  const handleCedula = (e) => {
    setCedulaText(e.target.value);
  };

  const handleDate = (e) => {
    setDataText(e.target.value);
  };

  const handleFileCedula = (e) => {
    const File = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      const obj = {
        file: base64,
        nameFile: `${cedulaText} - ${dateText}`,
        descriptionFile: `${cedulaText} - ${dateText}`,
        fileTypeId: "eec955be-5bb5-4c32-90fe-b60395251d93",
        fileTypeName:
          "CERTIFICADO DE MATRIMONIO, UNION DE HECHO O CEDULA DE CONYUGUE",
        isRequired: false,
      };
      AddFileData(obj);
    };

    reader.readAsDataURL(File);
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
              <Title>REPORTE DE CARGAS (CONYUGE)</Title>
            </ContentTitle>

            <Box sx={{ display: "flex" }}>
              <Box
                sx={{ width: isMobile ? 200 : 800, display: "flex", flexDirection: "column" }}
              >
                <label>Tiene cargas-tipo conyuge? </label>
                <FormControl>
                  <RadioGroup
                    value={chargedResponse}
                    onClick={(e) => {
                      handleChange(e.target.value, e.target.id);
                    }}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="71b6214c-cf46-44ee-a6f6-ee8dcf00d703" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      id="71b6214c-cf46-44ee-a6f6-ee8dcf00d703"
                      value="SI"
                      control={
                        <Radio id="71b6214c-cf46-44ee-a6f6-ee8dcf00d703" />
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
                  Trabaja en relación de dependencia o tiene actividad ecónomica
                  ?
                </label>
                <FormControl>
                  <RadioGroup
                    value={chargedRelation}
                    onClick={(e) => {
                      handleRelation(e.target.value, e.target.id);
                    }}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="98ca83e0-5c63-4a28-b8d6-646cd325dc0d" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="98ca83e0-5c63-4a28-b8d6-646cd325dc0d" />
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
                }}
              >
                <label>Cedula:</label>
                <InputCedula maxLength={10} onChange={handleCedula} />

                <label>Fecha Nacimiento:</label>
                <InputCedula onChange={handleDate} type="date" />
                <label>
                  Certificado de matrimonio, Unión de Hecho o Cédula de
                  identidad donde conste el cónyuge
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  onChange={handleFileCedula}
                />
              </Box>
            )}

            {chargedResponse == "SI" && (
              <Box
                sx={{
                  width: isMobile ? 200 : 800,
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 3,
                }}
              >
                <label>Tiene enfermedad catastrofica?</label>
                <FormControl>
                  <RadioGroup
                    value={chargedCertification}
                    onClick={(e) => {
                      handleCertification(e.target.value, e.target.id);
                    }}
                  >
                    <FormControlLabel
                      value="NO"
                      control={
                        <Radio id="082f72db-3699-4a1e-89cb-8bcc51629ae5" />
                      }
                      label="NO"
                    />
                    <FormControlLabel
                      value="SI"
                      control={
                        <Radio id="082f72db-3699-4a1e-89cb-8bcc51629ae5" />
                      }
                      label="SI"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {chargedCertification == "SI" && (
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
          </Person>
        </ContentInput>
      </ContentForm>
    </ContainerData>
  );
};

export default ChargedSpouse;
