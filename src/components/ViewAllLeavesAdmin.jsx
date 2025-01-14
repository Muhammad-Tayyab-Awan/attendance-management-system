import * as React from "react";

import toast from "react-hot-toast";
import { Table } from "flowbite-react";
import leaveApi from "../api/leaveApi";

const ViewAllLeavesAdmin = () => {
  const [data, setData] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    leaveApi.getAllLeavesOfUsers().then((res) => {
      if (res.success) {
        setData(res.allLeaves);
      } else {
        setData([]);
      }
    });
  }, []);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const handleApproveClick = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const id = e.target.id;
    const response = await leaveApi.reviewLeave(id, "approved");
    if (response.success) {
      toast.success(response.msg);
      leaveApi.getOverallLeaveOfUser().then((res) => {
        if (res.success) {
          setData({ nodes: res.allLeaves });
          setProcessing(false)
        } else {
          toast.error(res.error);
        }
      });
    } else {
      toast.error(response.error);
      setProcessing(false)
    }
  };

  const handleRejectClick = async (e) => {
    const id = e.target.id;
    const response = await leaveApi.reviewLeave(id, "rejected");
    if (response.success) {
      toast.success(response.msg);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      {data.length || data.length > 0 ? (
        <div className="overflow-x-auto my-4">
          <Table className="mx-auto w-[90%]">
            <Table.Head>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body  className="divide-y">
              {data.map((leave) => {
                return (
                  <Table.Row
                    className="bg-slate-300 dark:border-gray-700 dark:bg-gray-800"
                    key={leave._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {leave.userId._id}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(leave.startDate).toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(leave.endDate).toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {capitalizeFirstLetter(leave.status)}
                    </Table.Cell>
                    <Table.Cell>
                      {leave.status === "pending" ? (
                        <div className="flex w-full items-center justify-evenly">
                          <button
                            id={leave._id}
                            onClick={handleApproveClick}
                            disabled={processing}
                            className="rounded-md bg-white px-2 py-1 font-semibold text-black"
                          >
                            Approve
                          </button>
                          <button
                            id={leave._id}
                            onClick={handleRejectClick}
                            disabled={processing}
                            className="rounded-md bg-white px-2 py-1 font-semibold text-black"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        `${capitalizeFirstLetter(leave.status)}`
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div>No leaves found</div>
      )}
    </>
  );
};

export default ViewAllLeavesAdmin;
