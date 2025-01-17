/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../components/Navbar";
import authApi from "../api/authApi";
import { useEffect } from "react";
import { useRoleContext } from "../context/RoleContext";
import toast from "react-hot-toast";
import { UpdateProfile } from "../components/UpdateProfile";
import { UpdateProfileImage } from "../components/UpdateProfileImage";
import gradeApi from "../api/gradeApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import Loader from "../utils/Loader";
import { PieChart } from "@mui/x-charts";

function Profile() {
  const [grades, setGrades] = useState({});
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
  const { setStatus, setRole, role } = useRoleContext();
  useEffect(() => {
    authApi.verifyLogin().then(async (response) => {
      if (!response) {
        setStatus(response);
        await authApi.logout();
        navigate("/");
      } else {
        setStatus(response.status);
        setRole(response.role);
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
          setIsLoading(false);
          if (response.role === "user") {
            gradeApi.getGrades().then((response) => {
              if (response.success) {
                setGrades(response.grades);
              } else {
                toast.error(response.error);
              }
            });
          }
        } else {
          toast.error(data.error);
        }
      }
    });
  }, []);

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
      {isLoading && <Loader />}
      <NavBar />
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center gap-4 py-4">
        <div className="relative flex w-[95%] max-w-xl flex-col items-center gap-3 rounded-lg bg-slate-500 p-3">
          <div className="relative">
            <UpdateProfileImage user={userData} setUser={setUserData} />
            <Icon
              icon="mingcute:delete-fill"
              onClick={handleImageDelete}
              width="1.2em"
              height="1.2em"
              className="absolute right-2 top-3 cursor-pointer rounded-full bg-slate-100 p-0.5 dark:bg-slate-700"
            />
            <img
              src={userData.image}
              alt="profile"
              className="h-36 w-36 rounded-full"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-slate-100">
            <p className="text-lg font-semibold">{userData.name}</p>
            <p className="text-sm">{userData.username}</p>
            <a
              className="text-sm"
              href={`mailto:${userData.email}`}
              target="_blank"
            >
              {userData.email}
            </a>
            <p className="text-sm">Gender : {userData.gender}</p>
            <p className="text-sm">Address : {userData.address}</p>
          </div>
          <div className="right-3 top-3 flex items-center justify-center gap-6 sm:absolute">
            <UpdateProfile
              userData={userFullData}
              setNewData={setUserFullData}
              setUserData={setUserData}
            />
            <DeleteConfirmationModal />
          </div>
        </div>
        {role === "user" && (
          <div className="h-48 w-[90%] max-w-md rounded-md bg-white shadow-md shadow-indigo-600">
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value}`,
                  data: [
                    {
                      id: 0,
                      value: grades.totalAbsents,
                      label: "Absents",
                      color: "#ff5500",
                    },
                    {
                      id: 1,
                      value: grades.totalPresents,
                      label: "Presents",
                      color: "#55ff00",
                    },
                    {
                      id: 2,
                      value: grades.totalLeaves,
                      label: "Leaves",
                      color: "yellow",
                    },
                  ],
                },
              ]}
            />
          </div>
        )}
        {role === "user" && (
          <div className="mx-auto w-full max-w-xs rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h1 className="mb-4 text-center text-xl font-semibold text-blue-600 dark:text-blue-400">
              Grades
            </h1>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-around">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Total Days:</span>{" "}
                  {grades.totalDays}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Leaves:</span>{" "}
                  {grades.totalLeaves}
                </p>
              </div>
              <div className="flex items-center justify-around">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Presents:</span>{" "}
                  {grades.totalPresents}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Absents:</span>{" "}
                  {grades.totalAbsents}
                </p>
              </div>
              <div className="flex items-center justify-around">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Grade:</span> {grades.grade}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Percentage:</span>{" "}
                  {grades.percentage}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
