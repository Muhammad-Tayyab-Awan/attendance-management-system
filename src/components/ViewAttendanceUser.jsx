import * as React from "react";
import attendanceApi from "../api/attendanceApi";
import toast from "react-hot-toast";
import { Table } from "flowbite-react";

const ViewAttendanceUser = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    attendanceApi.getOverallAttendanceOfUser().then((response) => {
      if (response.success) {
        setData(response.attendances);
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
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Marked on</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((attendance) => {
                return (
                  <Table.Row
                    key={attendance._id}
                    className="bg-slate-300 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {new Date(attendance.date).toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {capitalizeFirstLetter(attendance.status)}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(attendance.markedDate).toTimeString()}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="mx-auto w-[80%] py-2 text-center text-xl">
          No attendance record found
        </div>
      )}
    </>
  );
};

export default ViewAttendanceUser;
