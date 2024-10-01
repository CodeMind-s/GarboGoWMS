import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../components/ResposiveDrawer";
import { deleteGarbage, getAllGarbages } from "../../../api/garbageApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ToastContainer, toast } from "react-toastify";
import Map from "../components/Map";
// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AdminGarbage = () => {
  const [garbages, setGarbages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedGarbageId, setSelectedGarbageId] = useState(null);
  const navigate = useNavigate();

  const fetchAllGarbages = async () => {
    try {
      const res = await getAllGarbages(); // Call the API to fetch garbages
      setGarbages(res); // Assuming setGarbages is your state setter for garbage data
    } catch (error) {
      alert(error.message);
      console.error("Error fetching garbages: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllGarbages();
  }, []);

  const handleClickOpen = (id) => {
    console.log(`id => `, id);
    setSelectedGarbageId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteGarbage = async () => {
    if (selectedGarbageId) {
      try {
        await deleteGarbage(selectedGarbageId);
        setGarbages((currentGarbage) =>
          currentGarbage.filter((garbage) => garbage._id !== selectedGarbageId)
        );
        handleClose();
        toast.success("Garbage request has been deleted successfully!", {
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

  function getStatusClassName(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Collected":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  }

  function getTypeClassName(type) {
    switch (type) {
      case "Organic":
        return "bg-green-100 text-green-800";
      case "Recyclable":
        return "bg-blue-100 text-blue-800";
      case "Non-Recyclable":
        return "bg-orange-100 text-orange-800";
      case "Hazardous":
        return "bg-red-100 text-red-800";
      case "E-Waste":
        return "bg-purple-100 text-purple-800";
      default:
        return "";
    }
  }

  const handleEditClick = (garbage) => {
    navigate("/admin/garbage/update", { state: { garbage } });
  };

  return (
    <ResponsiveDrawer>
      <Map />
      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-[#48752c] bg-white :text-white :bg-gray-800">
            Garbages Disposal Requests
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Email
              </th> */}
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {garbages.length > 0 ? (
              garbages.map((garbage) => (
                <tr
                  className="bg-white border-b :bg-gray-800 :border-gray-700"
                  key={garbage._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                  >
                    {garbage.user.username}
                  </th>
                  <td className="px-6 py-4">{garbage.mobileNumber}</td>

                  <td className="px-6 py-4 capitalize">
                    <span
                      className={`uppercase font-semibold text-[12px] px-2.5 py-0.5 rounded ${getTypeClassName(
                        garbage.typeOfGarbage
                      )}`}
                    >
                      {garbage.typeOfGarbage}
                    </span>
                  </td>
                  <td className="px-6 py-4">{garbage.address}</td>
                  <td className="px-6 py-4 capitalize">
                    <span
                      className={`uppercase font-semibold text-[12px] px-2.5 py-0.5 rounded ${getStatusClassName(
                        garbage.status
                      )}`}
                    >
                      {garbage.status}
                    </span>
                  </td>
                  <td className="px- py-4 text-right">
                    <a
                      onClick={() => handleEditClick(garbage)}
                      className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                    >
                      <EditIcon />
                    </a>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <a
                      onClick={() => handleClickOpen(garbage._id)}
                      className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                    >
                      <DeleteIcon />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td className="w-full text-md text-gray-600 font-semibold text-center col-span-5">
                  No garbage requests found!
                </td>
              </tr>
              // <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
              //   No garbage requests found!
              // </div>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The selected garbage disposal request will be deleted and cannot be
            retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteGarbage} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </ResponsiveDrawer>
  );
};

export default AdminGarbage;
