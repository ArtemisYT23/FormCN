import styled from "@emotion/styled";

export const ContainerData = styled.form`
  width: 900px;
  height: 100%;
  background-color: #fff;
  border-radius: 13px;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }
`;

export const ContentForm = styled.div`
    width: 100%;
    margin-top: 2rem;
`;

export const ContentInput = styled.div`
    width: 100%;
    display: flex;
`;

export const Person = styled.div`
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
    font-weight: bold;
    margin: 1rem 0 1rem 0;
    width: 90%;
    color: #3b3b3bcc;
  }
`;

export const ContentTitle = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.h1`
    font-size: 18px;
    width: 90%;
    margin: 0 0 1rem 0;
    color: #3b3b3bcc;
`;

export const ButtonAdd = styled.div`
    width: 20%;
    height: 30px;
    margin-top: 1rem;
    border: none;
    border-radius: 10px;
    color: #fff;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media screen and (max-width: 767px) {
    width: 120px;
  }
`;

export const InputCedula = styled.input`
  display: block;
  box-sizing: border-box;
  width: 30%;
  border-radius: 4px;
  border: 1px solid #c4c4c4; 
  padding: 10px 15px;
  font-size: 14px;
  outline: none;
  margin: 0 0 1rem 0;

  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;