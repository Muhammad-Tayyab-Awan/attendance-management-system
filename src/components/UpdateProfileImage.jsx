/* eslint-disable react/prop-types */
import { Button, Modal, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import authApi from "../api/authApi";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";

export function UpdateProfileImage({ user, setUser }) {
  const [openModal, setOpenModal] = useState(false);
  const [imageInput, setImageInput] = useState(null);
  const [processing, setProcessing] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    setProcessing(true);
    const formData = new FormData();
    formData.append("photo", imageInput);
    const response = await authApi.uploadImage(formData);
    setOpenModal(false);
    if (response.success) {
      const data = await authApi.getData();
      setUser({ ...user, image: data.user.profileImage });
      setProcessing(false);
      setOpenModal(false);
      toast.success(response.msg);
    } else {
      setProcessing(false);
      toast.error(response.error);
    }
    setImageInput(null);
  }

  return (
    <>
      <Icon
        icon="famicons:camera-sharp"
        onClick={() => setOpenModal(true)}
        width="1.2em"
        height="1.2em"
        className="absolute bottom-4 left-3 cursor-pointer rounded-full bg-slate-100 p-0.5 dark:bg-slate-700"
      />
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
          setImageInput(null);
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form className="text-center" noValidate onSubmit={handleUpload}>
            <div id="fileUpload" className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload file" />
              </div>
              <FileInput
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  e.preventDefault();
                  setImageInput(e.target.files[0]);
                }}
                required
                helperText="Only accept images in png, jpg and jpeg format"
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                disabled={!imageInput}
                isProcessing={processing}
                color="success"
                type="submit"
                gradientDuoTone="purpleToPink"
              >
                Upload
              </Button>
              <Button
                color="gray"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(false);
                  setImageInput(null);
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
