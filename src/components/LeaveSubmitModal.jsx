import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import Joi from "joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import leaveApi from "../api/leaveApi";
import toast from "react-hot-toast";
import { useAttendanceContext } from "../context/AttendanceContext";

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

export function LeaveSubmitModal() {
  const { marked } = useAttendanceContext();
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
      <Button onClick={() => setOpenModal(true)} size="sm" className="my-4">
        Submit Leave
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
              <Label
                htmlFor="reason"
                className="mb-2"
                value="Select your reason"
              />
              <Select
                id="reason"
                {...register("reason")}
                required
                color={errors.reason ? "failure" : undefined}
              >
                <option value="medical">Medical</option>
                <option value="personal">Personal</option>
                <option value="academic">Academic</option>
                <option value="other" defaultChecked>
                  Other
                </option>
              </Select>
              {errors.reason && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div className="max-w-md">
              <Label
                htmlFor="startDate"
                className="mb-2"
                value="Select leave start date"
              />
              <TextInput
                type="date"
                id="startDate"
                required
                color={errors.startDate ? "failure" : undefined}
                {...register("startDate")}
                min={
                  marked
                    ? `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${(new Date().getDate() + 1).toString().padStart(2, "0")}`
                    : `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
                }
              />
              {errors.startDate && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="max-w-md">
              <Label
                htmlFor="endDate"
                className="mb-2"
                value="Select leave end date"
              />
              <TextInput
                type="date"
                id="endDate"
                required
                color={errors.endDate ? "failure" : undefined}
                {...register("endDate", { required: true })}
                min={
                  marked
                    ? `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2,"0")}-${(new Date().getDate() + 1).toString().padStart(2, "0")}`
                    : `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
                }
              />
              {errors.endDate && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.endDate.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <Button type="submit" color="success" disabled={isSubmitting}>
                Submit Leave
              </Button>
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
