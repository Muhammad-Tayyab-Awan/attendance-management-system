import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import attendanceApi from "../api/attendanceApi";
import toast from "react-hot-toast";

const ViewAttendanceUser = () => {
  const [data, setData] = React.useState({
    nodes: [],
  });
  React.useEffect(() => {
    attendanceApi.getOverallAttendanceOfUser().then((response) => {
      if (response.success) {
        setData({ nodes: response.attendances });
      } else {
        toast.error(response.error);
      }
    });
  }, []);

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
    },
  ]);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const COLUMNS = [
    { label: "Id", renderCell: (item) => item._id },
    {
      label: "Date",
      renderCell: (item) => new Date(item.date).toUTCString(),
    },
    {
      label: "Status",
      renderCell: (item) => capitalizeFirstLetter(item.status),
    },
    {
      label: "Marked on",
      renderCell: (item) => new Date(item.markedDate).toUTCString(),
    },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </>
  );
};

export default ViewAttendanceUser;
