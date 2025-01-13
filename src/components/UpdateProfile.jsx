/* eslint-disable react/prop-types */
import { Button, Label, Modal, Radio, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../api/authApi";
import toast from "react-hot-toast";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router";

const schema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-z0-9]{6,18}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Username must consist of 6 to 18 chars (lowercase and numbers only)",
      "any.required": "Username is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email",
    }),

  firstName: Joi.string()
    .pattern(/^[A-Z][a-z]{3,20}$/)
    .required()
    .messages({
      "string.pattern.base":
        "First name must start with an uppercase letter and contain 4 to 21 characters",
      "any.required": "First name is required",
    }),

  lastName: Joi.string()
    .pattern(/^[A-Z][a-z]{3,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Last name must start with an uppercase letter and contain 4 to 31 characters",
      "any.required": "Last name is required",
    }),

  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either 'male' or 'female'",
    "any.required": "Gender is required",
  }),

  address: Joi.string()
    .pattern(/^[a-zA-Z0-9\s,.\\-]{10,70}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Address must be between 10 and 70 characters long and can include letters, numbers, spaces, commas, dots, and hyphens",
      "any.required": "Address is required",
    }),
});

export function UpdateProfile({ userData, setNewData, setUserData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      address: userData.address,
    },
  });
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  async function submitCredentials(data) {
    const response = await authApi.updateData(data);
    reset();
    onCloseModal();
    if (response.success) {
      const data = await authApi.getData();
      if (data.success) {
        setNewData(data.user);
        setUserData({
          username: data.user.username,
          name: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
          gender: data.user.gender === "male" ? "Male" : "Female",
          address: data.user.address,
          image: data.user.profileImage,
        });
        toast.success(response.msg);
      } else {
        toast.error(data.error);
      }
    } else {
      await authApi.logout();
      navigate("/");
      toast.error(response.error);
    }
  }

  return (
    <>
      <Icon
        icon="lucide:edit"
        onClick={() => setOpenModal(true)}
        className="cursor-pointer"
      />
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
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
                placeholder="example@mail.com"
                {...register("email")}
                color={errors.email && "failure"}
                helperText={<>{errors.email && errors.email.message}</>}
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
              disabled={isSubmitting}
              type="submit"
              className="w-1/2 self-center"
            >
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
