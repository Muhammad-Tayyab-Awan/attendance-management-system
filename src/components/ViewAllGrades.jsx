import * as React from "react";
import gradeApi from "../api/gradeApi";
import { Table } from "flowbite-react";

const ViewAllGrades = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    gradeApi.getAllUsersGrade().then((res) => {
      if (res.success) {
        setData(res.userGrades);
      } else {
        setData([]);
      }
    });
  }, []);

  return (
    <>
      {data.length || data.length > 0 ? (
        <div className="my-4 overflow-x-auto">
          <Table className="mx-auto w-[90%]">
            <Table.Head>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Grade</Table.HeadCell>
              <Table.HeadCell>Percentage</Table.HeadCell>
              <Table.HeadCell>Total Days</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((grade) => {
                return (
                  <Table.Row
                    className="bg-slate-300 dark:border-gray-700 dark:bg-gray-800"
                    key={grade._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {grade.userId}
                    </Table.Cell>
                    <Table.Cell>{grade.grade}</Table.Cell>
                    <Table.Cell>{grade.percentage}%</Table.Cell>
                    <Table.Cell>{grade.totalDays}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="mx-auto w-[80%] py-2 text-xl text-center">No grade record found</div>
      )}
    </>
  );
};

export default ViewAllGrades;
