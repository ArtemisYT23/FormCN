import styled from "@emotion/styled";

export const ContainerData = styled.form`
  width: 900px;
  height: 400px;
  background-color: #fff;
  border-radius: 13px;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 100%;
    border-radius: 13px;
    flex-direction: column;
    height: 590px;
  }
`;

export const InputCedula = styled.input`
  display: block;
  box-sizing: border-box;
  width: 90%;
  border-radius: 4px;
  border: 1px solid #c4c4c4; 
  padding: 10px 15px;
  font-size: 14px;
  outline: none;
  margin: 0 0 1rem 0;
`;

export const ContentForm = styled.div`
    width: 100%;
    margin-top: 2rem;
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

export const ContentInput = styled.div`
    width: 100%;
    display: flex;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
`;

export const Person = styled.div`
    width: 50%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
    font-weight: bold;
    margin: 0 0 .5rem 0;
    width: 90%;
    color: #3b3b3bcc;
  }

  @media screen and (max-width: 767px) {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`;

export const Income = styled.div`
    width: 80%;
    flex-direction: column;
    display: flex;
    align-items: center;

    label {
    font-weight: bold;
    margin: 0 0 .5rem 0;
    width: 90%;
    color: #3b3b3bcc;
  }
`;

