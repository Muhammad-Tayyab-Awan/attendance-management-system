/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import attendanceApi from "../api/attendanceApi";
import { useAttendanceContext } from "../context/AttendanceContext";
import Joi from "joi";
import toast from "react-hot-toast";
import leaveApi from "../api/leaveApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Label, Select, TextInput, Button } from "flowbite-react";

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

function SubmitLeave() {
  const { marked, setStatus, setMarked } = useAttendanceContext();

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

  const handleLeave = async (data) => {
    const response = await leaveApi.submitLeave(data);
    reset();
    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.error);
      reset();
    }
  };

  useEffect(() => {
    attendanceApi.getAttendance().then((response) => {
      if (response.success) {
        setMarked(true);
        setStatus(response.attendance.status);
      } else {
        setMarked(false);
      }
    });
  }, []);

  return (
    <div>
      <form
        className="mx-auto my-4 max-w-md space-y-6"
        onSubmit={handleSubmit(handleLeave)}
        noValidate
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Fill this form to submit your leave
        </h3>
        <div className="max-w-md">
          <Label htmlFor="reason" className="mb-2" value="Select your reason" />
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
                ? `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${(new Date().getDate() + 1).toString().padStart(2, "0")}`
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
          <Button type="submit" color="success" isProcessing={isSubmitting}>
            Submit Leave
          </Button>
          <Button
            color="failure"
            onClick={() => {
              reset();
            }}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SubmitLeave;
