import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FormSelect from "../../ui/FormSelect";
import { countryInfo } from "../../utils/countryData";
import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";

function GuestForm({ guestToEdit = {}, closeModal }) {
  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { createGuestMutate, isAdding } = useCreateGuest();
  const { editGuestMutate, isEditing } = useEditGuest();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const onSubmit = (data) => {
    if (isEditSession) {
      editGuestMutate(
        {
          editedInfo: {
            ...data,
            countryFlag: `https://flagcdn.com/${
              countryInfo[data.nationality]
            }.svg`,
          },
          editedGuestId: editId,
        },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    } else {
      createGuestMutate(
        {
          ...data,
          countryFlag: `https://flagcdn.com/${
            countryInfo[data.nationality]
          }.svg`,
        },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    }
  };

  const isWorking = isAdding || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.fullName?.message} label="Guest Full Name">
        <Input
          disabled={isWorking}
          type="text"
          id="fullName"
          placeholder="Johan Smith"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow error={errors?.nationalID?.message} label="National ID">
        <Input
          disabled={isWorking}
          type="number"
          id="nationalID"
          placeholder="4623131131"
          {...register("nationalID", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "NID shouldn't contain less than 10 digits",
            },
            maxLength: {
              value: 10,
              message: "NID shouldn't contain more than 10 digits",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          placeholder="user@example.com"
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <FormSelect
          id="nationality"
          defaultValues="Afghanistan"
          {...register("nationality")}
        >
          {Object.keys(countryInfo).map((countryName) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </FormSelect>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Guest" : "Create new Guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default GuestForm;
