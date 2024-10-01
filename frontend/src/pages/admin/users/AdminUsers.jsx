import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "../components/ResposiveDrawer";
import AuthService from "../../../api/userApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ToastContainer, toast } from "react-toastify";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleClickOpen = (id) => {
    console.log(`id => `, id);
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await AuthService.deleteUser(selectedUserId);
        setUsers((currentUser) =>
          currentUser.filter((user) => user._id !== selectedUserId)
        );
        handleClose();
        toast.success("User account has been deleted successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        alert(error.message);
        console.log("Error deleting garbage: ", error);
      }
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await AuthService.getAllUsers(); // Call the API to fetch users
      setUsers(res); // Assuming setUsers is your state setter for user data
    } catch (error) {
      alert(error.message);
      console.error("Error fetching garbages: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <ResponsiveDrawer>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-[#48752c] bg-white :text-white :bg-gray-800">
          User Account Holders
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            {/* <th scope="col" className="px-6 py-3">
                Email
              </th> */}
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              ecoscore
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              contact
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                className="bg-white border-b :bg-gray-800 :border-gray-700"
                key={user._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">{user.ecoscore}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">{user.contact}</td>
                <td className="px- py-4 text-right">
                  <a className="font-medium text-gray-400 :text-blue-500 cursor-pointer">
                    <EditIcon />
                  </a>
                </td>
                <td className="px-3 py-4 text-right">
                  <a
                    onClick={() => handleClickOpen(user._id)}
                    className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
              No registered user found!
            </div>
          )}
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The selected user accout will be deleted and cannot be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </ResponsiveDrawer>
  );
};

export default AdminUsers;
