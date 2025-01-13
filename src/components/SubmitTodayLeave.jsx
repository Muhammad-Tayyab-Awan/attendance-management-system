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
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <form
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label
              htmlFor="reason"
              className="mb-2"
              value="Select your reason"
            />
            <Select
              id="reason"
              {...register("reason")}
              color={errors.reason ? "failure" : undefined}
              helperText={errors.reason && <>{errors.reason.message}</>}
            >
              <option value="medical">Medical</option>
              <option value="personal">Personal</option>
              <option value="academic">Academic</option>
              <option value="other" defaultChecked>
                Other
              </option>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default SubmitTodayLeave;
