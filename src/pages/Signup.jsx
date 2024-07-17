import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const LoginText = styled.div`
  justify-self: center;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  gap: 0.6rem;
  color: var(--color-grey-500);
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-brand-500);
    font-weight: 600;
    transition: all 0.3s;
  }
  &:hover {
    color: var(--color-brand-300);
  }
`;

function Signup() {
  return (
    <>
      <LoginLayout>
        <Logo />
        <Heading as="h4">Create a Wild Oasis account</Heading>
        <SignupForm />
        <LoginText>
          <p>Already have an account?</p>
          <StyledLink to="/login">Sign in</StyledLink>
        </LoginText>
      </LoginLayout>
    </>
  );
}

export default Signup;
