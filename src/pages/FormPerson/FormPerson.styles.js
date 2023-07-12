import styled from "@emotion/styled";

export const ContainerDataForm = styled.form`
  width: 1000px;
  height: 100%;
  background-color: #fff;
  border-radius: 13px;
  padding: 1rem;
  border: 1px solid #fff;
  margin-top: 1rem;

  @media screen and (max-width: 767px) {
    width: 410px;
    border-radius: 13px;
    flex-direction: column;
  }
`;