import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 16rem 1fr;
  row-gap: 0.6rem;
  /* gap: 2.4rem; */

  padding: 1.2rem 0;

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
  grid-column: 2/-1;
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

function BookingFormRow({
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

export default BookingFormRow;
