import { HiOutlineInformationCircle } from "react-icons/hi2";
import AddBooking from "../features/bookings/AddBooking";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledInfoDiv = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const StyledInfoText = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-500);
  }
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

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <Row>
        <BookingTable />
        <StyledInfoDiv>
          <AddBooking />
          <StyledInfoText>
            <HiOutlineInformationCircle />
            <p>
              Before adding a new Booking, please visit
              <StyledLink to="/guests"> Guests </StyledLink>
              tab to add the new guest first
            </p>
          </StyledInfoText>
        </StyledInfoDiv>
      </Row>
    </>
  );
}

export default Bookings;
