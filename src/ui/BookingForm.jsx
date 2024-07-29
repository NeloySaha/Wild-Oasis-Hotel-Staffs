import styled, { css } from "styled-components";

const BookingForm = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 80rem;
      column-gap: 4.8rem;
      padding: 1.6rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

BookingForm.defaultProps = {
  type: "regular",
};

export default BookingForm;
