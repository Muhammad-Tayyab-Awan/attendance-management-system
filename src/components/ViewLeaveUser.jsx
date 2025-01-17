import * as React from "react";
import toast from "react-hot-toast";
import leaveApi from "../api/leaveApi";
import { Table } from "flowbite-react";

const ViewLeaveUser = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    leaveApi.getOverallLeaveOfUser().then((response) => {
      if (response.success) {
        setData(response.allLeaves);
      } else {
        toast.error(response.error);
      }
    });
  }, []);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <>
      {data && data.length > 0 ? (
        <div className="my-4 overflow-x-auto">
          <Table className="mx-auto w-auto">
            <Table.Head>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>Ending Date</Table.HeadCell>
              <Table.HeadCell>Reason</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((leave) => {
                return (
                  <Table.Row
                    key={leave._id}
                    className="bg-slate-300 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(leave.startDate).toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(leave.endDate).toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {capitalizeFirstLetter(leave.reason)}
                    </Table.Cell>
                    <Table.Cell>
                      {capitalizeFirstLetter(leave.status)}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="mx-auto w-[80%] py-2 text-center text-xl">
          No leave record found
        </div>
      )}
    </>
  );
};

export default ViewLeaveUser;
