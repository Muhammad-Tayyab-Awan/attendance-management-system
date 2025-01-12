import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";

import toast from "react-hot-toast";
import userApi from "../api/userApi";
import { Button } from "flowbite-react";

const ViewAllUsers = () => {
  const [data, setData] = React.useState({
    nodes: [],
  });

  React.useEffect(() => {
    userApi.getAllUsersByAdmin().then((res) => {
      if (res.success) {
        setData({ nodes: res.allUsers });
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

  const handleDeleteClick = async (e) => {
    const id = e.target.id;
    const response = await userApi.deleteUserById(id);
    if (response.success) {
      toast.success(response.msg);
      setData({ nodes: data.nodes.filter((item) => item._id !== id) });
    } else {
      toast.error(response.error);
    }
  };

  const handleVerifyClick = async (e) => {
    const id = e.target.id;
    const response = await userApi.verifyUserById(id);
    if (response.success) {
      toast.success(response.msg);
      userApi.getAllUsersByAdmin().then((res) => {
        if (res.success) {
          setData({ nodes: res.allUsers });
        } else {
          toast.error(res.error);
        }
      });
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
                  <strong>Name:</strong> {item.firstName + " " + item.lastName}
                </li>
                <li>
                  <strong>Email:</strong>
                  {item.email}
                </li>
                <li>
                  <strong>Role:</strong> {item.role}
                </li>
                <li>
                  <strong>Verified:</strong>
                  {item.verified ? (
                    "Verified"
                  ) : (
                    <>
                      {"Not Verified"}
                      <Button
                        size="xs"
                        id={item._id}
                        onClick={handleVerifyClick}
                      >
                        Verify Now
                      </Button>
                    </>
                  )}
                </li>
                <li>
                  <Button size="xs" id={item._id} onClick={handleDeleteClick}>
                    Delete
                  </Button>
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
      label: "Username",
      renderCell: (item) => item.username,
      style: { width: "150px" },
    },
    {
      label: "Email",
      renderCell: (item) => item.email,
      style: { width: "250px" },
    },
    {
      label: "Name",
      renderCell: (item) => item.firstName + " " + item.lastName,
      style: { width: "150px" },
    },
    {
      label: "Role",
      renderCell: (item) => capitalizeFirstLetter(item.role),
      style: { width: "100px" },
    },
    {
      label: "Gender",
      renderCell: (item) => capitalizeFirstLetter(item.gender),
      style: { width: "100px" },
    },
    {
      label: "Address",
      renderCell: (item) => capitalizeFirstLetter(item.address),
      style: { width: "300px" },
    },
    {
      label: "Status",
      renderCell: (item) => (item.status ? "Verified" : "Not Verified"),
      style: { width: "120px" },
    },
    {
      label: "Verified",
      renderCell: (item) => (item.verified ? "Yes" : "No"),
      style: { width: "100px" },
    },
  ];

  const handleDeletion = async () => {
    const response = await userApi.deleteAllUsers();
    if (response.success) {
      toast.success(response.msg);
      userApi.getAllUsersByAdmin().then((res) => {
        if (res.success) {
          setData({ nodes: res.allUsers });
        } else {
          toast.error(res.error);
        }
      });
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <CompactTable
        columns={COLUMNS}
        rowProps={ROW_PROPS}
        rowOptions={ROW_OPTIONS}
        data={data}
        theme={theme}
      />
      <div>
        <Button onClick={handleDeletion}>Delete All Users</Button>
      </div>
    </>
  );
};

export default ViewAllUsers;
