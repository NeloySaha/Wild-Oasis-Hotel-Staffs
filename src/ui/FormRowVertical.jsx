import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const PassDiv = styled.div`
  position: relative;
`;

const EyeButton = styled.div`
  background: none;
  border: none;
  position: absolute;
  right: 5%;
  top: 25%;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-500);
  }
`;

function FormRowVertical({
  label,
  error,
  children,
  passView,
  setPassView,
  password = false,
}) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {password ? (
        <PassDiv>
          {children}
          <EyeButton onClick={() => setPassView((prev) => !prev)} type="button">
            {passView ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
          </EyeButton>
        </PassDiv>
      ) : (
        children
      )}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
