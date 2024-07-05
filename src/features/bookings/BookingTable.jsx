import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useBookings } from "./useBookings";
import { useBookingPrefetch } from "./useBookingPrefetch";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  // Prefetching data for the booking form
  useBookingPrefetch();

  if (!bookings?.length) return <Empty resourceName={"Bookings"} />;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} bookingPage={true} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
