import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import authApi from "../api/authApi";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useRoleContext } from "../context/roleContext";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email.",
    }),
  password: Joi.string()
    .min(8)
    .pattern(/[a-z].*[a-z]/, "at least 2 lowercase letters")
    .pattern(/[A-Z].*[A-Z]/, "at least 2 uppercase letters")
    .pattern(/\d.*\d/, "at least 2 numbers")
    .pattern(/[^a-zA-Z0-9].*[^a-zA-Z0-9]/, "at least 2 symbols")
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.name":
        "Password must contain at least 2 uppercase, 2 lowercase, 2 numbers, and 2 symbols.",
    }),
});

export function LoginForm() {
  const { setStatus } = useRoleContext();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitCredentials = async (data) => {
    const response = await authApi.login(data);
    if (!response.success) {
      toast.error(response.error);
    }
    reset();
    toast.success(response.msg);
    setStatus(true);
    navigate("/dashboard");
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(submitCredentials)}
      noValidate
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="example@mail.com"
          {...register("email", { required: true })}
          color={errors.email && "failure"}
          helperText={<>{errors.email && errors.email.message}</>}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password", { required: true })}
          color={errors.password && "failure"}
          helperText={<>{errors.password && errors.password.message}</>}
          required
        />
      </div>
      <Button disabled={isSubmitting} type="submit">
        Login
      </Button>
    </form>
  );
}
