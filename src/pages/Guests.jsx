import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import GuestTableOperations from "../features/guests/GuestTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        <GuestTableOperations />
      </Row>

      <Row>
        <GuestTable />
        <AddGuest />
      </Row>
    </>
  );
}

export default Guests;


