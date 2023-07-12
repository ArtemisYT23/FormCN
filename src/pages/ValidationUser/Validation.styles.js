import styled from "@emotion/styled";

export const ContentValidate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const ContainerCedula = styled.form`
  width: 900px;
  height: 100%;
  background-color: #fff;
  border-radius: 13px;
  padding: 1rem;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    font-weight: bold;
    margin: 0 0 .5rem 0;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }
`;

export const InputCedula = styled.input`
  display: block;
  box-sizing: border-box;
  width: 50%;
  border-radius: 4px;
  border: 1px solid #c4c4c4; 
  padding: 10px 15px;
  font-size: 14px;
  outline: none;
  margin: 0 0 1rem 0;
`;

export const ButtonValidate = styled.button`
    border: none;
    width: 100px;
    height: 2rem;
    background-color: red;
    color: #fff;
    border-radius: 7px;
    cursor: pointer;

    &:disabled {
        background-color: #FF5454;
        cursor: default;
    }
`;

export const MessageError = styled.p`
    width: 50%;
    color: red;
    font-weight: bold;
    font-size: 12px;
`;