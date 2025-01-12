import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Label, Select } from "flowbite-react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import leaveApi from "../api/leaveApi";
import toast from "react-hot-toast";

const schema = Joi.object({
  reason: Joi.string()
    .valid("medical", "personal", "academic", "other")
    .required()
    .messages({
      "any.required": "Reason is required",
      "any.only": "Reason must be one of: medical, personal, academic, other",
    }),
});

function SubmitTodayLeave() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await leaveApi.submitTodayLeave(data);
    reset();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default SubmitTodayLeave;
