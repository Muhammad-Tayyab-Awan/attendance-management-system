/* eslint-disable react/prop-types */
import { Button, Modal, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import authApi from "../api/authApi";
import toast from "react-hot-toast";

export function UpdateProfileImage({ user, setUser }) {
  const [openModal, setOpenModal] = useState(false);
  const [imageInput, setImageInput] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", imageInput);
    const response = await authApi.uploadImage(formData);
    setOpenModal(false);
    if (response.success) {
      const data = await authApi.getData();
      setUser({ ...user, image: data.user.profileImage });
      toast.success(response.msg);
    } else {
      toast.error(response.error);
    }
    setImageInput(null);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Upload Profile Image</Button>
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
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  e.preventDefault();
                  setImageInput(e.target.files[0]);
                }}
                required
                helperText="Only accept images in png, jpg and jpeg format"
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button disabled={!imageInput} color="success" type="submit">
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
