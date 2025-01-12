import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";

import gradeApi from "../api/gradeApi";

const ViewAllGrades = () => {
  const [data, setData] = React.useState({
    nodes: [],
  });

  React.useEffect(() => {
    gradeApi.getAllUsersGrade().then((res) => {
      if (res.success) {
        setData({ nodes: res.userGrades });
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

  const ROW_PROPS = {
    onClick: handleExpand,
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
                <li>{item.userId}</li>
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
      renderCell: (item) => item.userId,
      style: { width: "150px" },
    },
    {
      label: "Total Days",
      renderCell: (item) => item.totalDays,
      style: { width: "150px" },
    },
    {
      label: "Total Presents",
      renderCell: (item) => item.totalPresents,
      style: { width: "150px" },
    },
    {
      label: "Total Absents",
      renderCell: (item) => item.totalAbsents,
      style: { width: "150px" },
    },
    {
      label: "Total Leaves",
      renderCell: (item) => item.totalLeaves,
      style: { width: "150px" },
    },
    {
      label: "Percentage",
      renderCell: (item) => item.percentage,
      style: { width: "120px" },
    },
    {
      label: "Grade",
      renderCell: (item) => item.grade,
      style: { width: "250px" },
    },
  ];

  return (
    <>
      {data.nodes.length > 0 ? (
        <CompactTable
          columns={COLUMNS}
          rowProps={ROW_PROPS}
          rowOptions={ROW_OPTIONS}
          data={data}
          theme={theme}
        />
      ) : (
        <h1>No grades record found</h1>
      )}
    </>
  );
};

export default ViewAllGrades;
