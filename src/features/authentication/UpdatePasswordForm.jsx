import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useUpdateUser } from "./useUpdateUser";
import PasswordInput from "../../ui/PasswordInput";
import { useState } from "react";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const [passView, setPassView] = useState(false);
  const [confirmPassView, setConfirmPassView] = useState(false);

  const { editUserMutation, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    editUserMutation({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
        password={true}
        setPassView={setPassView}
        passView={passView}
      >
        <PasswordInput
          type={passView ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          placeholder="e.g.: lajkshdkj12_$#@!"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
        password={true}
        setPassView={setConfirmPassView}
        passView={confirmPassView}
      >
        <PasswordInput
          type={confirmPassView ? "text" : "password"}
          autoComplete="new-password"
          placeholder="e.g.: lajkshdkj12_$#@!"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
