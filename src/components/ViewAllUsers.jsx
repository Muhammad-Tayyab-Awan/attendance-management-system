import * as React from "react";
import toast from "react-hot-toast";
import userApi from "../api/userApi";
import { Button, Table } from "flowbite-react";
import AddUser from "./AddUser";

const ViewAllUsers = () => {
  const [processing, setProcessing] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    userApi.getAllUsersByAdmin().then((res) => {
      if (res.success) {
        setData(res.allUsers);
      } else {
        setData([]);
        toast.error(res.error);
      }
    });
  }, []);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const id = e.target.parentElement.id;
    const response = await userApi.deleteUserById(id);
    if (response.success) {
      toast.success(response.msg);
      setData(data.filter((item) => item._id !== id));
    } else {
      toast.error(response.error);
    }
    setProcessing(false);
  };

  const handleVerifyClick = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const id = e.target.parentElement.id;
    const response = await userApi.verifyUserById(id);
    if (response.success) {
      toast.success(response.msg);
      userApi.getAllUsersByAdmin().then((res) => {
        if (res.success) {
          setData(res.allUsers);
        } else {
          toast.error(res.error);
        }
      });
    } else {
      toast.error(response.error);
    }
    setProcessing(false);
  };

  const handleDeletion = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const response = await userApi.deleteAllUsers();
    if (response.success) {
      toast.success(response.msg);
      userApi.getAllUsersByAdmin().then((res) => {
        if (res.success) {
          setData(res.allUsers);
        } else {
          toast.error(res.error);
        }
      });
    } else {
      toast.error(response.error);
    }
    setProcessing(false);
  };

  return (
    <>
      {data && data.length > 0 ? (
        <div className="my-4 overflow-x-auto">
          <Table className="mx-auto w-[90%]">
            <Table.Head>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Gender</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>User Status</Table.HeadCell>
              <Table.HeadCell>Verified</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((user) => {
                return (
                  <Table.Row
                    className="bg-slate-300 dark:border-gray-700 dark:bg-gray-800"
                    key={user._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{capitalizeFirstLetter(user.role)}</Table.Cell>
                    <Table.Cell>
                      {capitalizeFirstLetter(user.gender)}
                    </Table.Cell>
                    <Table.Cell>{user.address}</Table.Cell>
                    <Table.Cell>
                      {user.status ? "Valid" : "Not Valid"}
                    </Table.Cell>
                    <Table.Cell>
                      {user.verified ? (
                        "Verified"
                      ) : (
                        <Button
                          size="xs"
                          id={user._id}
                          color="success"
                          isProcessing={processing}
                          onClick={handleVerifyClick}
                        >
                          Verify Now
                        </Button>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size="xs"
                        color="failure"
                        id={user._id}
                        isProcessing={processing}
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="mx-auto w-[80%] py-2 text-center text-xl">
          No user record found
        </div>
      )}
      <div>
        <Button onClick={handleDeletion} isProcessing={processing} className="mx-auto" color="failure">
          Delete All Users
        </Button>
      </div>
      <AddUser />
    </>
  );
};

export default ViewAllUsers;
