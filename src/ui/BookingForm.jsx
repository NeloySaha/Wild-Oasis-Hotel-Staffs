import styled from "styled-components";

const BookingForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 880px;
  /* column-gap: 4.8rem; */
  padding: 20px 28px;

  & > *:nth-child(even) {
    padding-left: 64px;
  }

  overflow: hidden;
  font-size: 1.4rem;
`;

export default BookingForm;
