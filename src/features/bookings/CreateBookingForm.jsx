// {
//     created_at: fromToday(-20, true),
//     startDate: fromToday(0),
//     endDate: fromToday(7),
//     cabinId: 1,
//     guestId: 2,
//     hasBreakfast: true,
//     observations:
//       'I have a gluten allergy and would like to request a gluten-free breakfast.',
//     isPaid: false,
//     numGuests: 1,
//   },

import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useCabins } from "../cabins/useCabins";
import FormSelect from "../../ui/FormSelect";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useAllGuests } from "../guests/useAllGuests";
import Input from "../../ui/Input";
import { useEffect } from "react";
import { differenceInDays } from "date-fns";
import Textarea from "../../ui/Textarea";
import { useSettings } from "../settings/useSettings";
import { useCreateBooking } from "./useCreateBooking";

function CreateBookingForm({ bookingToEdit = {}, closeModal }) {
  const { id: editBookingId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editBookingId);

  const { createBookingMutate, isAdding } = useCreateBooking();

  const isWorking = isAdding;

  const { cabins, isLoading: isCabinLoading } = useCabins();
  const { guests, isLoading: isGuestLoading } = useAllGuests();
  const { settings } = useSettings();
  const {
    minimumBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
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
      totalPrice: extraPrice + data.cabinPrice,
      status: "unconfirmed",
    };
    console.log(bookingObj);

    createBookingMutate(bookingObj, {
      onSuccess: () => {
        reset();
        closeModal?.();
      },
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "hasBreakfast") {
        const extrasPrice =
          value.hasBreakfast === "Yes"
            ? value.numNights * breakfastPrice * value.numGuests
            : 0;

        setValue("extrasPrice", extrasPrice);
        return;
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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.cabinId?.message} label="Cabin">
        {isCabinLoading ? (
          <SpinnerMini />
        ) : (
          <FormSelect
            disabled={isWorking}
            defaultValue={cabins?.[0].id}
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
      </FormRow>

      <FormRow error={errors?.guestId?.message} label="Booked by guest">
        {isGuestLoading ? (
          <SpinnerMini />
        ) : (
          <FormSelect
            disabled={isWorking}
            id="guestId"
            defaultValue={guests?.[0].id}
            {...register("guestId")}
          >
            {guests?.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {`ID-${guest.id} ${guest.fullName}`}
              </option>
            ))}
          </FormSelect>
        )}
      </FormRow>

      <FormRow label="Booking Start Date" error={errors?.startDate?.message}>
        <Input
          disabled={isWorking}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Booking End Date" error={errors?.endDate?.message}>
        <Input
          disabled={isWorking}
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="No. of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          defaultValue={0}
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
      </FormRow>

      <FormRow label="No. of Guests" error={errors?.numGuests?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="numGuests"
          defaultValue={0}
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
      </FormRow>

      <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        <FormSelect
          disabled={isWorking}
          id="hasBreakfast"
          defaultValue={"No"}
          {...register("hasBreakfast")}
        >
          <option value={"No"}>No</option>
          <option value={"Yes"}>Yes</option>
        </FormSelect>
      </FormRow>

      <FormRow label="Observations">
        <Textarea
          disabled={isWorking}
          id="observations"
          placeholder="e.g.: I will arrive late"
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          defaultValue={0}
          disabled={true}
          {...register("cabinPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          defaultValue={0}
          disabled={true}
          {...register("extrasPrice")}
        />
      </FormRow>

      <FormRow label="Payment Status" error={errors?.isPaid?.message}>
        <FormSelect
          disabled={isWorking}
          id="isPaid"
          defaultValue={"No"}
          {...register("isPaid")}
        >
          <option value={"No"}>No</option>
          <option value={"Yes"}>Yes</option>
        </FormSelect>
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>

        <Button>{isEditSession ? "Edit Booking" : "Create new Booking"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
