import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function GuestForm({ cabinToEdit = {}, closeModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  //   const { createCabinMutate, isAdding } = useCreateCabin();
  //   const { editCabinMutate, isEditing } = useEditCabin();
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const onSubmit = (data) => {
    const image = typeof data.image === "string";

    if (isEditSession) {
      //   image
      //     ? editCabinMutate(
      //         { cabinData: { ...data }, editId },
      //         {
      //           onSuccess: () => {
      //             reset();
      //             closeModal?.();
      //           },
      //         }
      //       )
      //     : editCabinMutate(
      //         { cabinData: { ...data, image: data.image[0] }, editId },
      //         {
      //           onSuccess: () => {
      //             reset();
      //             closeModal?.();
      //           },
      //         }
      //       );
    } else {
      //   createCabinMutate(
      //     { ...data, image: data.image[0] },
      //     {
      //       onSuccess: () => {
      //         reset();
      //         closeModal?.();
      //       },
      //     }
      //   );
    }
  };

  const isWorking = false;

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
          placeholder="06231311319"
          {...register("nationalID", {
            required: "This field is required",
            min: {
              value: 10,
              message: "NID shouldn't contain less than 10 digits",
            },
            max: {
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
