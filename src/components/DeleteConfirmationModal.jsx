import { useNavigate } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import authApi from "../api/authApi";
import toast from "react-hot-toast";

export function DeleteConfirmationModal() {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  async function handleDelete() {
    const response = await authApi.deleteAccount();
    setProcessing(false);
    if (response.success) {
      toast.success(response.msg);
      navigate("/");
    } else {
      toast.error(response.error);
    }
    setOpenModal(false);
  }
  return (
    <>
      <Icon
        onClick={() => setOpenModal(true)}
        icon="mingcute:delete-fill"
        className="bottom-9 right-3 cursor-pointer"
      />
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                isProcessing={processing}
                color="failure"
                onClick={() => {
                  setProcessing(true);
                  handleDelete();
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
