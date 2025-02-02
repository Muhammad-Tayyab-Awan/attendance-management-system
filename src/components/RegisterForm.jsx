import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import authApi from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const schema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-z0-9]{6,18}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Username must consist of 6 to 18 chars (lowercase and numbers only)",
      "string.empty": "Username is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email",
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
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.name":
        "Password must contain at least 2 uppercase, 2 lowercase, 2 numbers, and 2 symbols",
    }),

  firstName: Joi.string()
    .pattern(/^[A-Z][a-z]{3,20}$/)
    .required()
    .messages({
      "string.pattern.base":
        "First name must start with an uppercase letter and contain 4 to 21 characters",
      "string.empty": "First name is required",
    }),

  lastName: Joi.string()
    .pattern(/^[A-Z][a-z]{3,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Last name must start with an uppercase letter and contain 4 to 31 characters",
      "string.empty": "Last name is required",
    }),

  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either 'male' or 'female'",
    "string.empty": "Gender is required",
  }),

  address: Joi.string()
    .pattern(/^[a-zA-Z0-9\s,.\\-]{10,70}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Address must be between 10 and 70 characters long and can include letters, numbers, spaces, commas, dots, and hyphens",
      "string.empty": "Address is required",
    }),
});

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const submitCredentials = async (data) => {
    data.role = "user";
    const response = await authApi.register(data);
    reset();
    if (response.success) {
      toast.success(response.msg);
      navigate("/");
    } else {
      toast.error(response.error);
    }
  };

  return (
    <form
      className="my-4 flex w-full max-w-md flex-col gap-4 rounded-md bg-slate-400 p-4 shadow-md shadow-purple-600 dark:bg-purple-900"
      onSubmit={handleSubmit(submitCredentials)}
      noValidate
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="Enter username"
          {...register("username")}
          color={errors.username && "failure"}
          helperText={<>{errors.username && errors.username.message}</>}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="First Name" />
        </div>
        <TextInput
          id="firstName"
          type="text"
          placeholder="Enter first name"
          {...register("firstName")}
          color={errors.firstName && "failure"}
          helperText={<>{errors.firstName && errors.firstName.message}</>}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Last Name" />
        </div>
        <TextInput
          id="lastName"
          type="text"
          placeholder="Enter last name"
          {...register("lastName")}
          color={errors.lastName && "failure"}
          helperText={<>{errors.lastName && errors.lastName.message}</>}
          required
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-2 block self-start">
          <Label value="Gender" />
        </div>
        <div className="flex w-1/2 items-center justify-around">
          <div className="flex w-1/2 items-center gap-4">
            <Radio
              id="male"
              type="radio"
              value="male"
              {...register("gender")}
              required
            />
            <Label htmlFor="male" value="Male" />
          </div>
          <div className="flex w-1/2 items-center gap-4">
            <Radio
              id="female"
              type="radio"
              value="female"
              {...register("gender")}
              color={errors.gender && "failure"}
              required
            />
            <Label htmlFor="female" value="Female" />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          autoComplete="username"
          placeholder="example@mail.com"
          {...register("email")}
          color={errors.email && "failure"}
          helperText={<>{errors.email && errors.email.message}</>}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          {...register("password")}
          color={errors.password && "failure"}
          helperText={<>{errors.password && errors.password.message}</>}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="address" value="Address" />
        </div>
        <TextInput
          id="address"
          type="text"
          placeholder="Enter address"
          {...register("address")}
          color={errors.address && "failure"}
          helperText={<>{errors.address && errors.address.message}</>}
          required
        />
      </div>
      <Button
        isProcessing={isSubmitting}
        type="submit"
        gradientDuoTone="purpleToBlue"
        className="w-1/2 self-center"
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
