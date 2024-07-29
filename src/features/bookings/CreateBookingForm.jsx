import { differenceInDays } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useCabins } from "../cabins/useCabins";
import FormSelect from "../../ui/FormSelect";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAllGuests } from "../guests/useAllGuests";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useSettings } from "../settings/useSettings";
import { useCreateBooking } from "./useCreateBooking";
import { useEditBooking } from "./useEditBooking";
import BookingForm from "../../ui/BookingForm";
import BookingFormRow from "../../ui/BookingFormRow";
import styled from "styled-components";

const ButtonContainer = styled.div`
  padding-top: 1.6rem;
  display: flex;
  justify-content: end;
  gap: 2.4rem;
  grid-column: 1/-1;
`;

function CreateBookingForm({ bookingToEdit = {}, closeModal }) {
  const { id: editBookingId, ...primaryValues } = bookingToEdit;
  const isEditSession = Boolean(editBookingId);
  const { createBookingMutate, isAdding } = useCreateBooking();
  const { editEditBookingMutate, isEditing } = useEditBooking();
  const isWorking = isAdding || isEditing;

  const { cabins, isLoading: isCabinLoading } = useCabins();
  const { guests, isLoading: isGuestLoading } = useAllGuests();
  const { settings } = useSettings();
  const {
    minimumBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  let defaultValues;

  if (!isEditSession) {
    defaultValues = {
      cabinId: cabins?.[0].id,
      guestId: guests?.[0].id,
      numNights: 0,
      numGuests: 0,
      observations: "",
      cabinPrice: 0,
      extrasPrice: 0,
      totalPrice: 0,
      hasBreakfast: "No",
      isPaid: "No",
    };
  } else {
    defaultValues = {
      numNights: primaryValues.numNights,
      numGuests: primaryValues.numGuests,
      observations: primaryValues.observations,
      cabinPrice: primaryValues.cabinPrice,
      extrasPrice: primaryValues.extrasPrice,
      startDate: primaryValues.startDate.slice(0, 10),
      endDate: primaryValues.endDate.slice(0, 10),
      cabinId: primaryValues.cabins.id,
      guestId: primaryValues.guests.id,
      hasBreakfast: primaryValues.hasBreakfast ? "Yes" : "No",
      isPaid: primaryValues.isPaid ? "Yes" : "No",
      totalPrice: primaryValues.totalPrice,
      status: primaryValues.status,
    };
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const extraPrice = data.hasBreakfast === "No" ? 0 : data.extrasPrice;

    const bookingObj = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      extrasPrice: extraPrice,
      hasBreakfast: data.hasBreakfast === "Yes",
      isPaid: data.isPaid === "Yes",
      status: isEditSession ? data.status : "unconfirmed",
    };

    if (isEditSession) {
      editEditBookingMutate(
        { editId: editBookingId, editedBookingObj: bookingObj },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    } else {
      createBookingMutate(bookingObj, {
        onSuccess: () => {
          reset();
          closeModal?.();
        },
      });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "cabinPrice" || name === "extrasPrice") {
        const selectedCabin = cabins.find(
          (cabin) => cabin.id === Number(value.cabinId)
        );

        const cabinPrice =
          value.numNights *
          (selectedCabin.regularPrice - selectedCabin.discount);

        const extrasPrice =
          value.hasBreakfast === "Yes"
            ? value.numNights * breakfastPrice * value.numGuests
            : 0;

        setValue("totalPrice", cabinPrice + extrasPrice);
        return;
      }

      if (
        name === "hasBreakfast" ||
        name === "numGuests" ||
        name === "numNights"
      ) {
        const extrasPrice =
          value.hasBreakfast === "Yes"
            ? value.numNights * breakfastPrice * value.numGuests
            : 0;

        setValue("extrasPrice", extrasPrice);
      }

      if (name === "numNights" || name === "cabinId") {
        const selectedCabin = cabins.find(
          (cabin) => cabin.id === Number(value.cabinId)
        );

        setValue(
          "cabinPrice",
          value.numNights *
            (selectedCabin.regularPrice - selectedCabin.discount)
        );
        return;
      }

      if (name !== "startDate" && name !== "endDate") return;

      if (value.startDate.length && value.endDate.length) {
        setValue("numNights", differenceInDays(value.endDate, value.startDate));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, cabins, breakfastPrice]);

  return (
    <BookingForm
      onSubmit={handleSubmit(onSubmit)}
      type={closeModal ? "modal" : "regular"}
    >
      <BookingFormRow error={errors?.cabinId?.message} label="Cabin">
        {isCabinLoading ? (
          <SpinnerMini />
        ) : (
          <FormSelect
            disabled={isWorking}
            id="cabinId"
            {...register("cabinId")}
          >
            {cabins?.map((cabin) => (
              <option key={cabin.id} value={cabin.id}>
                {cabin.name}
              </option>
            ))}
          </FormSelect>
        )}
      </BookingFormRow>

      <BookingFormRow error={errors?.guestId?.message} label="Booked by guest">
        {isGuestLoading ? (
          <SpinnerMini />
        ) : (
          <FormSelect
            disabled={isWorking}
            id="guestId"
            {...register("guestId")}
          >
            {guests?.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {`ID-${guest.id} ${guest.fullName}`}
              </option>
            ))}
          </FormSelect>
        )}
      </BookingFormRow>

      <BookingFormRow
        label="Booking Start Date"
        error={errors?.startDate?.message}
      >
        <Input
          disabled={isWorking}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </BookingFormRow>

      <BookingFormRow label="Booking End Date" error={errors?.endDate?.message}>
        <Input
          disabled={isWorking}
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </BookingFormRow>

      <BookingFormRow label="No. of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={true}
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: minimumBookingLength,
              message: `Booking should be at least ${minimumBookingLength} nights`,
            },
            max: {
              value: maxBookingLength,
              message: `Booking should be less than ${
                maxBookingLength + 1
              } nights`,
            },
          })}
        />
      </BookingFormRow>

      <BookingFormRow label="No. of Guests" error={errors?.numGuests?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: `Guests can't be zero`,
            },
            max: {
              value: maxGuestsPerBooking,
              message: `Guests should be less than ${maxGuestsPerBooking + 1}`,
            },

            validate: (guestAmount) => {
              const selectedCabin = cabins.find(
                (cabin) => cabin.id === Number(getValues().cabinId)
              );

              return (
                Number(guestAmount) <= Number(selectedCabin.maxCapacity) ||
                `Can't fit more than ${selectedCabin.maxCapacity} guests`
              );
            },
          })}
        />
      </BookingFormRow>

      <BookingFormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        <FormSelect
          disabled={isWorking}
          id="hasBreakfast"
          {...register("hasBreakfast")}
        >
          <option value={"No"}>No</option>
          <option value={"Yes"}>Yes</option>
        </FormSelect>
      </BookingFormRow>

      <BookingFormRow label="Observations">
        <Textarea
          disabled={isWorking}
          id="observations"
          placeholder="e.g.: I will arrive late"
          {...register("observations")}
        />
      </BookingFormRow>

      <BookingFormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled={true}
          {...register("cabinPrice", {
            required: "This field is required",
          })}
        />
      </BookingFormRow>

      <BookingFormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          disabled={true}
          {...register("extrasPrice")}
        />
      </BookingFormRow>

      <BookingFormRow label="Payment Status" error={errors?.isPaid?.message}>
        <FormSelect disabled={isWorking} id="isPaid" {...register("isPaid")}>
          <option value={"No"}>No</option>
          <option value={"Yes"}>Yes</option>
        </FormSelect>
      </BookingFormRow>

      <BookingFormRow label="Total Price">
        <Input
          type="number"
          id="totalPrice"
          disabled={true}
          {...register("totalPrice")}
        />
      </BookingFormRow>

      <ButtonContainer>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>

        <Button disabled={isWorking}>
          {isEditSession ? "Edit Booking" : "Create new Booking"}
        </Button>
      </ButtonContainer>
    </BookingForm>
  );
}

export default CreateBookingForm;
