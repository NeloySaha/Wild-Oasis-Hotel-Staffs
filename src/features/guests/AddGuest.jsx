import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import GuestForm from "./GuestForm";

function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button>Add new Guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
          <GuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
