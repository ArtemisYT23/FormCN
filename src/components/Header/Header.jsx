import {
  ContainerHeader,
  ContentLogo,
  ContainerImg,
  KeyContainer,
  ContentText,
  Content
} from "./Header.styles";
import CNLogo from "../../assets/cnLogo.png";

const Header = () => {
  return (
    <ContainerHeader>
      <Content>
        <ContentLogo>
          <ContainerImg>
            <KeyContainer imagen={CNLogo} />
          </ContainerImg>
        </ContentLogo>
        <ContentText>
          <span>Ley Fortalecimiento Economía Familiar Gastos Personales</span>
        </ContentText>
      </Content>
    </ContainerHeader>
  );
};

export default Header;
