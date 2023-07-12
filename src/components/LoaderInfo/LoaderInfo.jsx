import styled from "@emotion/styled";

const LoaderInfo = () => {
  return <IconLoader />;
};

export default LoaderInfo;

const IconLoader = styled.span`
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;

  &::after,
  &::before {
    content: "";
    width: 48px;
    height: 48px;
    border: 2px solid #c4c4c4;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    animation: rotation 2s ease-in-out infinite;
  }

  &::after {
    border-color: red;
    animation-delay: 1s;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
