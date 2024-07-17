import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import FormRowVertical from "../../ui/FormRowVertical";
import PasswordInput from "../../ui/PasswordInput";
import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    reset,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();
  const [passView, setPassView] = useState(false);
  const [repeatPassView, setRepeatPassView] = useState(false);

  const { signUpMutation, isLoading } = useSignup();

  function handleSignUp({ fullName, email, password }) {
    signUpMutation(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(handleSignUp)}>
      <FormRowVertical label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "This field is required",
          })}
          placeholder="Daemon Targaryen"
        />
      </FormRowVertical>

      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          placeholder="daemon@gmail.com"
        />
      </FormRowVertical>

      <FormRowVertical
        label="Password (min 8 characters)"
        error={errors?.password?.message}
        password={true}
        passView={passView}
        setPassView={setPassView}
      >
        <PasswordInput
          type={passView ? "text" : "password"}
          id="password"
          disabled={isLoading}
          placeholder="e.g.: lajkshdkj12_$#@!"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
        password={true}
        passView={repeatPassView}
        setPassView={setRepeatPassView}
      >
        <PasswordInput
          type={repeatPassView ? "text" : "password"}
          id="passwordConfirm"
          disabled={isLoading}
          placeholder="e.g.: lajkshdkj12_$#@!"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (currentValue) =>
              currentValue === getValues().password ||
              "Passwords need to match",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Sign up" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
