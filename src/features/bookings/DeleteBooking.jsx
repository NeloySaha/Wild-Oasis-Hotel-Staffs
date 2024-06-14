import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";

function DeleteBooking({ bookingId }) {
  const { deleteBookingMutate, isDeleting } = useDeleteBooking();
  const moveback = useMoveBack();

  return (
    <Modal>
      <Modal.Open opens="deleteBooking">
        <Button variation="danger">Delete Booking</Button>
      </Modal.Open>

      <Modal.Window name="deleteBooking">
        <ConfirmDelete
          resourceName="booking"
          onConfirm={() => {
            deleteBookingMutate(bookingId, {
              onSettled: moveback,
            });
          }}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteBooking;
