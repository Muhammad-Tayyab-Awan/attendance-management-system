import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";

import toast from "react-hot-toast";
import { Button } from "flowbite-react";
import leaveApi from "../api/leaveApi";

const ViewAllLeavesAdmin = () => {
  const [data, setData] = React.useState({
    nodes: [],
  });

  React.useEffect(() => {
    leaveApi.getAllLeavesOfUsers().then((res) => {
      if (res.success) {
        setData({ nodes: res.allLeaves });
      } else {
        toast.error(res.error);
      }
    });
  }, []);

  const [ids, setIds] = React.useState([]);

  const handleExpand = (item) => {
    if (ids.includes(item._id)) {
      setIds(ids.filter((id) => id !== item._id));
    } else {
      setIds(ids.concat(item._id));
    }
  };

  const colorTheme = {
    BaseRow: `
        color: #141414;
      `,
    Row: `
        &:hover {
          color: orange;
        }

        cursor: pointer;
      `,
  };

  const stripedTheme = {
    BaseRow: `
        font-size: 14px;
      `,
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
  };

  const marginTheme = {
    BaseCell: `
        margin: 9px;
        padding: 11px;
      `,
  };

  const theme = useTheme([colorTheme, stripedTheme, marginTheme]);

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const ROW_PROPS = {
    onClick: handleExpand,
  };

  const handleApproveClick = async (e) => {
    const id = e.target.id;
    const response = await leaveApi.reviewLeave(id, "approved");
    if (response.success) {
      toast.success(response.msg);
      leaveApi.getOverallLeaveOfUser().then((res) => {
        if (res.success) {
          setData({ nodes: res.allLeaves });
        } else {
          toast.error(res.error);
        }
      });
    } else {
      toast.error(response.error);
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

  const ROW_OPTIONS = {
    renderAfterRow: (item) => (
      <>
        {ids.includes(item._id) && (
          <tr style={{ display: "flex", gridColumn: "1 / -1" }}>
            <td style={{ flex: "1" }}>
              <ul
                style={{
                  margin: "0",
                  padding: "0",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <li>
                  <strong>Status:</strong>
                  {item.status !== "pending" ? (
                    capitalizeFirstLetter(item.status)
                  ) : (
                    <>
                      <Button
                        size="xs"
                        id={item._id}
                        onClick={handleRejectClick}
                      >
                        Reject
                      </Button>
                      <Button
                        size="xs"
                        id={item._id}
                        onClick={handleApproveClick}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                </li>
              </ul>
            </td>
          </tr>
        )}
      </>
    ),
  };

  const COLUMNS = [
    {
      label: "User Id",
      renderCell: (item) => item.userId._id,
      style: { width: "150px" },
    },
    {
      label: "Start Date",
      renderCell: (item) => new Date(item.startDate).toUTCString(),
      style: { width: "150px" },
    },
    {
      label: "End Date",
      renderCell: (item) => new Date(item.endDate).toUTCString(),
      style: { width: "250px" },
    },
    {
      label: "Reason",
      renderCell: (item) => capitalizeFirstLetter(item.reason),
      style: { width: "100px" },
    },
    {
      label: "Status",
      renderCell: (item) => capitalizeFirstLetter(item.status),
      style: { width: "120px" },
    },
  ];

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        rowProps={ROW_PROPS}
        rowOptions={ROW_OPTIONS}
        data={data}
        theme={theme}
      />
    </>
  );
};

export default ViewAllLeavesAdmin;
