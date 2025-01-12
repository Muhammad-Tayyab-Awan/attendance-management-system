import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import toast from "react-hot-toast";
import leaveApi from "../api/leaveApi";

const ViewLeaveUser = () => {
  const [data, setData] = React.useState({
    nodes: [],
  });
  React.useEffect(() => {
    leaveApi.getOverallLeaveOfUser().then((response) => {
      if (response.success) {
        setData({ nodes: response.allLeaves });
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
      label: "Starting From",
      renderCell: (item) => new Date(item.startDate).toUTCString(),
    },
    {
      label: "Ending on",
      renderCell: (item) => new Date(item.endDate).toUTCString(),
    },
    {
      label: "Reason",
      renderCell: (item) => capitalizeFirstLetter(item.reason),
    },
    {
      label: "Status",
      renderCell: (item) => capitalizeFirstLetter(item.status),
    },
  ];

  return (
    <>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </>
  );
};

export default ViewLeaveUser;
