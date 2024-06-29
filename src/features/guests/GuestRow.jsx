import styled from "styled-components";
import Table from "../../ui/Table";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

const GuestName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const NationalId = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  font-family: "Sono";
`;

const CountryInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const CountryFlag = styled.img`
  max-width: 2.8rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

const Email = styled.div`
  color: var(--color-brand-500);
  font-size: 1.4rem;
  font-family: "Sono";
`;

function GuestRow({
  guest: { id: guestId, fullName, nationalID, countryFlag, nationality, email },
}) {
  return (
    <>
      <Table.Row>
        <GuestName>{fullName}</GuestName>
        <NationalId>{nationalID}</NationalId>

        <CountryInfo>
          <CountryFlag src={countryFlag} />
          <p>{nationality}</p>
        </CountryInfo>

        <Email>{email}</Email>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={guestId} />

              <Menus.List id={guestId}>
                <Modal.Open opens="edit-guest">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete-guest">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              {/* <Modal.Window name="edit-guest">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window> */}

              {/* <Modal.Window name="delete-guest">
                <ConfirmDelete
                  resourceName="cabins"
                  onConfirm={() => {
                    deleteCabinMutation(guestId);
                  }}
                  disabled={isWorking}
                />
              </Modal.Window> */}
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default GuestRow;
