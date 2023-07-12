import { createContext, useContext, useState } from "react";
import {
  userSesion,
  userVerify,
  getAllIndex,
  getAllFileType,
  getAllIndexComparative,
} from "../services";
import { useFetchAndLoad } from "../hooks";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../types/route.types";

const AuthContext = createContext({
  Token: null,
  cedula: null,
  verifyUser: null,
  loading: false,
  index: [],
  filetype: [],
  metadata: [],
  FileData: [],
  SignInDashboard: () => {},
  LogOutDashboard: () => {},
  VerifyCedulaByUser: () => {},
  AllIndexCedula: () => {},
  AllFileTypeDocument: () => {},
  UpdateMetadata: () => {},
  AddFileData: () => {},
  valueState: false,
  validateChild: () => {},
  valueStateFather: false,
  validateFather: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState(null);
  const [Token, setToken] = useState(null);
  const [verifyUser, setVerifyUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [filetype, setFiletype] = useState([]);
  const [FileData, setFileData] = useState([]);
  const [valueState, setValueState] = useState(false);
  const [valueStateFather, setValueStateFather] = useState(false);

  const { callEndpoint } = useFetchAndLoad();

  const SignInDashboard = async (userData, Cedula) => {
    try {
      const responseSesion = await callEndpoint(userSesion(userData));
      if (responseSesion.status == 200) {
        setToken(responseSesion.data.token);
        VerifyCedulaByUser(Cedula, responseSesion.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LogOutDashboard = () => {
    setToken(null);
    navigate("/");
  };

  const VerifyCedulaByUser = async (cedula, token) => {
    setLoading(true);
    try {
      const responseSesion = await callEndpoint(userVerify(cedula, token));
      if (responseSesion.status == 200) {
        setVerifyUser(responseSesion.data);
        setCedula(cedula);
        navigate(`/${PrivateRoutes.authenticated}`);
        setLoading(false);
        AllIndexCedula(responseSesion?.data?.documentId, token, cedula);
        AllFileTypeDocument(responseSesion?.data?.documentId, token);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const AllIndexCedula = async (documentId, token, cedula) => {
    try {
      const responseIndex = await callEndpoint(getAllIndex(documentId, token));
      if (responseIndex.status == 200) {
        try {
          const responseComparative = await callEndpoint(
            getAllIndexComparative(cedula, token)
          );
          if (responseComparative.status == 200) {
            setMetadata(responseIndex.data);
            setIndex(responseComparative.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AllFileTypeDocument = async (documentId, token) => {
    try {
      const responseFileType = await callEndpoint(
        getAllFileType(documentId, token)
      );
      if (responseFileType.status == 200) {
        setFiletype(responseFileType.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateMetadata = (metadata) => {
    setMetadata(metadata);
  };

  const AddFileData = (newFileData) => {
    const { descriptionFile } = newFileData;

    const isDescriptionRepeated = FileData.some(
      (file) => file.descriptionFile === descriptionFile
    );

    if (isDescriptionRepeated) {
      //
    } else {
      setFileData((prevFileData) => [...prevFileData, newFileData]);
    }
  };

  const validateChild = (bool) => {
    setValueState(bool);
  }

  const validateFather = (bool) => {
    setValueStateFather(bool);
  }

  return (
    <AuthContext.Provider
      value={{
        cedula,
        Token,
        verifyUser,
        loading,
        SignInDashboard,
        LogOutDashboard,
        index,
        filetype,
        metadata,
        UpdateMetadata,
        FileData,
        AddFileData,
        valueState,
        validateChild,
        valueStateFather,
        validateFather
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
