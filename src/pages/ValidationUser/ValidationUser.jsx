import {
  ContentValidate,
  ContainerCedula,
  InputCedula,
  ButtonValidate,
  MessageError,
} from "./Validation.styles";
import { Header, BodyDescription, LoaderInfo } from "../../components";
import { useForm } from "react-hook-form";
import { UserAuth } from "../../context/AuthContext";

const ValidationUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { SignInDashboard, loading } = UserAuth();

  const onSubmit = (data) => {
    const useData = {
      userName: "cerveceriaadmin",
      password: "G5Hn2+ylhpA=",
    };
    SignInDashboard(useData, data?.cedula);
  };

  return (
    <ContentValidate>
      <Header />
      <BodyDescription />
      <ContainerCedula onSubmit={handleSubmit(onSubmit)}>
        <label>Cedula: </label>
        {errors?.cedula?.type === "required" && (
          <MessageError>Campo Requerido</MessageError>
        )}
        {errors?.cedula?.type === "maxLength" && (
          <MessageError>Cedula Incorrecta</MessageError>
        )}
        {errors?.cedula?.type === "minLength" && (
          <MessageError>Cedula Incorrecta</MessageError>
        )}
        {errors?.cedula?.type === "pattern" && (
          <MessageError>Ingrese Valores Solo Numericos</MessageError>
        )}
        <InputCedula
          {...register("cedula", {
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]*(\.?)^\d+$/,
          })}
        />
        {loading ? <LoaderInfo /> : <ButtonValidate>Validar</ButtonValidate>}
      </ContainerCedula>
    </ContentValidate>
  );
};

export default ValidationUser;
