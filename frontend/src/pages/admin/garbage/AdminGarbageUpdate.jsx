import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../components/ResposiveDrawer";
import { updateGarbage } from "../../../api/garbageApi"; // Update the path accordingly
import { ToastContainer, toast } from "react-toastify";
import GarbageDisplayMap from "./GarbageDisplayMap";

const AdminGarbageUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(location.state.garbage.status);
  const [lat, setLat] = useState(location.state.garbage.latitude);
  const [lon, setLon] = useState(location.state.garbage.longitude);
  const [type, setType] = useState(location.state.garbage.typeOfGarbage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateGarbage function with the new status and garbage ID
      await updateGarbage(status, location.state.garbage._id);

      // Show success toast
      toast.success("Garbage status has been updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to the admin garbage page after a short delay
      setTimeout(() => {
        navigate("/admin/garbage");
      }, 2000); // Adjust the delay as needed (3000ms = 3 seconds)
    } catch (error) {
      console.error("Error updating garbage status:", error.message);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <ResponsiveDrawer>
      <div className="grid grid-cols-2 gap-0">
        <GarbageDisplayMap
          garbagelat={lat}
          garbagelon={lon}
          garbagetype={type}
        />
        <div className="max-w mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update Garbage Status</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={location.state.garbage.user.username}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">Type of Garbage</label>
                <input
                  type="text"
                  value={location.state.garbage.typeOfGarbage}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={location.state.garbage.address}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  value={location.state.garbage.mobileNumber}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Collected">Collected</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-7 bg-[#48752c] text-white rounded-md hover:bg-[#f9da78] hover:text-black hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Status
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </ResponsiveDrawer>
  );
};

export default AdminGarbageUpdate;
