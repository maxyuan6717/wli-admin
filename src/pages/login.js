import { Base } from "../util/base";
import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 80px;
  font-weight: 100;
  max-width: 800px;
  margin-bottom: 20px;
`;

const StyledLogin = styled.span`
  padding: 15px 25px;
  font-size: 20px;
  font-weight: 600;
  background-color: white;
  border: 2px solid black;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3rem;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

const Login = () => {
  return (
    <div className="m-auto text-center" style={{ paddingBottom: "40px" }}>
      <StyledTitle>Admin Login</StyledTitle>
      <StyledLogin
        onClick={async () => {
          window.location.href = `${Base}/auth/cas`;
        }}
      >
        Login with CAS
      </StyledLogin>
    </div>
  );
};

export default Login;
