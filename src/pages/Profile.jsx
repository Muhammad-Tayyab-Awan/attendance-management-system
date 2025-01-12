/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect } from "react";
import { useRoleContext } from "../context/roleContext";
import toast from "react-hot-toast";
import { UpdateProfile } from "../components/UpdateProfile";
import { Button, Spinner } from "flowbite-react";
import { UpdateProfileImage } from "../components/UpdateProfileImage";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    gender: "",
    address: "",
    image: "",
  });
  const [userFullData, setUserFullData] = useState({});
  const navigate = useNavigate();
  const { setStatus, setRole } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
        navigate("/");
      } else {
        setStatus(response.status);
        setRole(response.role);
        setIsLoading(false);
        const data = await authApi.getData();
        if (data.success) {
          setUserData({
            username: data.user.username,
            name: `${data.user.firstName} ${data.user.lastName}`,
            email: data.user.email,
            gender: data.user.gender === "male" ? "Male" : "Female",
            address: data.user.address,
            image: data.user.profileImage
              ? data.user.profileImage
              : data.user.gender === "male"
                ? "https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
                : "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
          });
          setUserFullData(data.user);
        } else {
          toast.error(data.error);
        }
      }
    });
  }, []);

  async function handleDelete() {
    const response = await authApi.deleteAccount();
    if (response.success) {
      toast.success(response.msg);
      navigate("/");
    } else {
      toast.error(response.error);
    }
  }

  async function handleImageDelete() {
    const response = await authApi.deleteImage();
    if (response.success) {
      toast.success(response.msg);
      setUserData({
        ...userData,
        image:
          userFullData.gender === "male"
            ? "https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
            : "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
      });
    } else {
      toast.error(response.error);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 text-white">
          <Spinner size="xl" />
        </div>
      )}
      <NavBar />
      <div>
        <h1>Profile</h1>
        <img
          src={userData.image}
          alt="profile"
          className="h-28 w-28 rounded-full"
        />
        <div>Name : {userData.name}</div>
        <div>Username : {userData.username}</div>
        <div>Email : {userData.email}</div>
        <div>Gender : {userData.gender}</div>
        <div>Address : {userData.address}</div>
      </div>
      <UpdateProfile
        userData={userFullData}
        setNewData={setUserFullData}
        setUserData={setUserData}
      />
      <UpdateProfileImage user={userData} setUser={setUserData} />
      <Button onClick={handleDelete}>Delete Account</Button>
      <Button onClick={handleImageDelete}>Delete Profile Image</Button>
    </>
  );
}

export default Profile;
