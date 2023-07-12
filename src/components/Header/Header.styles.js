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

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  @media screen and (max-width: 767px) {
    display: flex;
    padding: 0;
  }
`;

export const ContentLogo = styled.div`
width: 30%;
display: flex;
justify-content: center;
align-items: center;
@media screen and (max-width: 767px) {
  width: 35%;
}
`;

export const ContainerImg = styled.div`
width: 180px;
height: 80px;
@media screen and (max-width: 767px) {
  width: 105px;
  height: 55px;
}
`;

export const KeyContainer = styled.div`
width: 100%;
height: 100%;
background-image: url(${(props) => props.imagen});
background-size: contain;
background-position: center;
background-repeat: no-repeat;
`;

export const ContentText = styled.div`
display: flex;
justify-content: center;
width: 70%;
color: #3b3b3bcc;
font-size: 2.5rem;
font-weight: 900;
display: flex;
align-items: flex-end;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 margin: 0 0 .5rem 0; 
@media screen and (max-width: 767px) {
  font-size: 1.3rem;
  text-decoration: none;
  font-weight: bold;
  margin-top: 0;
  text-align: center;
}
`;