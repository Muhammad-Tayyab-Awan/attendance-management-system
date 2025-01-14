import * as React from "react";
import { Table } from "flowbite-react";
import attendanceApi from "../api/attendanceApi";

const ViewAllAttendanceAdmin = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    attendanceApi.getAllAttendanceByAdmin().then((res) => {
      if (res.success) {
        setData( res.attendances );
      } else {
        setData([]);
      }
    });
  }, []);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
        <>
      {data.length || data.length > 0 ? (
        <div className="overflow-x-auto my-4">
          <Table className="mx-auto w-[90%]">
            <Table.Head>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Marked On</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body  className="divide-y">
              {data.map((attendance) => {
                return (
                  <Table.Row
                    className="bg-slate-300 dark:border-gray-700 dark:bg-gray-800"
                    key={attendance._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {attendance.userId}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(attendance.date).toDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(attendance.markedDate).toTimeString()}
                    </Table.Cell>
                    <Table.Cell>
                      {capitalizeFirstLetter(attendance.status)}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="mx-auto w-[80%] py-2 text-xl text-center">No attendance record found</div>
      )}
    </>
  );
};

export default ViewAllAttendanceAdmin;
