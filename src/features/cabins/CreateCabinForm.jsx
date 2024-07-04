import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { createCabinMutate, isAdding } = useCreateCabin();
  const { editCabinMutate, isEditing } = useEditCabin();
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
      image
        ? editCabinMutate(
            { cabinData: { ...data }, editId },
            {
              onSuccess: () => {
                reset();
                closeModal?.();
              },
            }
          )
        : editCabinMutate(
            { cabinData: { ...data, image: data.image[0] }, editId },
            {
              onSuccess: () => {
                reset();
                closeModal?.();
              },
            }
          );
    } else {
      createCabinMutate(
        { ...data, image: data.image[0] },
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

  // const errorFunc = (errors) => {
  //   console.log(errors);
  // };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          placeholder="012"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          placeholder="06"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular Price">
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          placeholder="$240"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (discountValue) =>
              +discountValue <= +getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description">
        <Textarea
          disabled={isWorking}
          id="description"
          placeholder="Luxurious and Cozy"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
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
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
