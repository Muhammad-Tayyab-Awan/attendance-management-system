/* eslint-disable react/prop-types */
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import Joi from "joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import leaveApi from "../api/leaveApi";
import toast from "react-hot-toast";

const schema = Joi.object({
  startDate: Joi.date().iso().required().messages({
    "any.required": "Start date is required",
    "date.format": "Invalid start date format",
  }),
  endDate: Joi.date().iso().required().greater(Joi.ref("startDate")).messages({
    "any.required": "End date is required",
    "date.format": "Invalid end date format",
    "date.greater": "End date must be greater than or equal to start date",
  }),
  reason: Joi.string()
    .valid("medical", "personal", "academic", "other")
    .required()
    .messages({
      "any.required": "Reason is required",
      "any.only": "Reason must be one of: medical, personal, academic, other",
    }),
});

export function LeaveSubmitModal({ attendanceMarked }) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      reason: "",
      startDate: "",
      endDate: "",
    },
  });

  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
    reset();
  }

  const handleLeave = async (data) => {
    const response = await leaveApi.submitLeave(data);
    reset();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
    setOpenModal(false);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        Submit Leave for other days
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit(handleLeave)}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Fill this form to submit your leave
            </h3>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="reason" value="Select your reason" />
              </div>
              <Select
                id="reason"
                {...register("reason")}
                required
                color={errors.reason && "failure"}
                helperText={<>{errors.reason && errors.reason.message}</>}
              >
                <option value="medical">Medical</option>
                <option value="personal">Personal</option>
                <option value="academic">Academic</option>
                <option value="other" defaultChecked>
                  Other
                </option>
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="startDate" value="Select leave start date" />
              </div>
              <TextInput
                type="date"
                required
                id="startDate"
                color={errors.startDate && "failure"}
                {...register("startDate")}
                min={
                  attendanceMarked
                    ? `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? 0 + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1}-${new Date().getDate() + 1 < 10 ? 0 + (new Date().getDate() + 1).toString() : new Date().getDate() + 1}`
                    : `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? 0 + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? 0 + new Date().getDate().toString() : new Date().getDate()}`
                }
                helperText={<>{errors.startDate && errors.startDate.message}</>}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="endDate" value="Select leave end date" />
              </div>
              <TextInput
                type="date"
                required
                id="endDate"
                color={errors.endDate && "failure"}
                {...register("endDate", { required: true })}
                min={
                  attendanceMarked
                    ? `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? 0 + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1}-${new Date().getDate() + 1 < 10 ? 0 + (new Date().getDate() + 1).toString() : new Date().getDate() + 1}`
                    : `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? 0 + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? 0 + new Date().getDate().toString() : new Date().getDate()}`
                }
                helperText={<>{errors.endDate && errors.endDate.message}</>}
              />
            </div>
            <div className="max-w-md">
              <Button type="submit" disabled={isSubmitting}>
                Submit Leave
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
