import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 0.4fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
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

function FormRow({
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

export default FormRow;
