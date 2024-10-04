import React, { useEffect, useState} from 'react'
import ResponsiveDrawer from "../components/ResposiveDrawer";
import { deleteSchedule, getAllSchedules } from '../../../api/scheduleApi';
import { getAllTrucks } from '../../../api/truckApi';
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ScheduleCreateForm from '../components/ScheduleCreateForme';
import ScheduleUpdateForm from '../components/ScheduleUpdateForm';

// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  
  const fetchAllSchedules = async () => {
    try {
      const res = await getAllSchedules();
      setSchedules(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching schedules: ", error.message);
    }
  }; // Fetch all trucks
 
  const fetchAllTrucks = async () => {
    try {
      const res= await getAllTrucks();
      setTrucks(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching trucks: ", error.message);
    }
  }; // Fetch all trucks

  useEffect(() => {
    fetchAllSchedules();
    fetchAllTrucks();
  }, []);

  const handleClickOpen = (id) => {
    console.log(`id => `, id);
    setSelectedScheduleId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSchedule = async () => {
    if (selectedScheduleId) {
      try {
        await deleteSchedule(selectedScheduleId);
        setSchedules((currentSchedules) =>
          currentSchedules.filter((schedule) => schedule._id !== selectedScheduleId)
        );
        handleClose();
        toast.success("Scheduele has been deleted successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } catch (error) {
        console.error("Error deleting schedule: ", error.message);
        toast.error("Error deleting schedule request!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    }
  }; // Delete a truck

  return (
    <ResponsiveDrawer>
      <div className="flex justify-end mb-4">
        <ScheduleCreateForm />
      </div>
      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-[#48752c] bg-white :text-white :bg-gray-800">
            Schedule Management
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Truck Number
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Phone Number
              </th> */}
              <th scope="col" className="px-6 py-3">
                Area
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Status
              </th> */}
              <th scope="col" className="px-4 py-3">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((schedule) => {const truck = trucks.find(truck => truck._id === schedule.truckId);
                  return(
                  <tr
                    className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-100 :hover:bg-gray-900"
                    key={schedule._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                    >
                      {/* {schedule.truckId} */}
                      {truck?.truckNumber || 'Truck not found'}
                    </th>
                    <td className="px-6 py-4">{schedule.area}</td>
                    <td className="px-6 py-4">{schedule.time}</td>
                    <td className="px-6 py-4">{new Date(schedule.date).toLocaleDateString()}</td>

                    {/* <td className="px-6 py-4 capitalize">
                      <span
                        className={`uppercase font-semibold text-[12px] w-fit px-2.5 py-0.5 rounded flex items-center ${getStatusClassName(
                          truck.availabilityStatus
                        )}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            truck.availabilityStatus
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        {truck.availabilityStatus
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </td> */}
                    <td className="px- py-4 text-right ">
                      {/* <a
                        onClick={() => handleEditClick(truck)}
                        className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                      >
                        <EditIcon />
                      </a> */}
                      {<ScheduleUpdateForm schedule={schedule} />}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <a
                        onClick={() => handleClickOpen(schedule._id)}
                        className="font-medium text-red-600 :text-blue-500 cursor-pointer hover:text-red-800"
                      >
                        <DeleteIcon />
                      </a>
                    </td>
                  </tr>
                )})
            ) : (
              <tr className="">
                <td className="w-full text-md text-gray-600 font-semibold text-center col-span-5">
                  No truck requests found!
                </td>
              </tr>
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
            The selected Schedule will be deleted and cannot be
            retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteSchedule} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </ResponsiveDrawer>
  )
}
