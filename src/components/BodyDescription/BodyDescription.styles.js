import styled from "@emotion/styled";

export const ContainerHeader = styled.div`
  width: 900px;
  height: 100%;
  background-color: #fff;
  border-radius: 13px;
  margin: 0 0 0.3rem 0;
  border: 1px solid #fff;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }
`;

export const ContainerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const ContentLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 1rem;
  border-radius: 13px;
  color: #000;

  @media screen and (max-width: 767px) {
    display: flex; 
    justify-content: center;
    align-items: center;
    margin: 0 0 0 .3rem;
  }
`;

export const Introducction = styled.p`
  text-align: justify;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 4px solid #3b3b3bcc;
  line-height: 1.6;

  a {
    margin-left: .5rem;
  }

  @media screen and (max-width: 767px) {
    width: 90%;
    height: 100%;
    border-radius: 13px;
  }
`;

export const AditionalInformation = styled.span`
  font-weight: bold;
`;