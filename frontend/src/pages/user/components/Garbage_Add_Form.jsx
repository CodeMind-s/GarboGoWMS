import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import { createGarbage } from "../../../api/garbageApi";

export default function Garbage_Add_Form() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  // Initialize state for all form fields in one object
  const [garbageEntryData, setGarbageEntryData] = useState({
    address: "",
    mobileNumber: "",
    date: "",
    latitude: "",
    longitude: "",
    typeOfGarbage: "",
  });

  // Destructure state variables
  const { address, mobileNumber, date, latitude, longitude, typeOfGarbage } =
    garbageEntryData;

  const [touched, setTouched] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Phone number validation function
  const validatePhone = (mobile) => {
    return /^\d{10}$/.test(mobile); // Validates if the phone number has exactly 10 digits
  };

  const handleChange = (e) => {
    setGarbageEntryData({
      ...garbageEntryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newGarbageEntry = {
      address,
      mobileNumber,
      latitude,
      longitude,
      typeOfGarbage,
    };

    try {
      console.log(`newGarbageEntry => `, newGarbageEntry);
      await createGarbage(newGarbageEntry);

      toast.success("Garbage entry submitted successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSubmit(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting garbage entry:", error);
      toast.error("Failed to submit garbage entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    setGarbageEntryData((prevData) => ({
      ...prevData,
      date: today.toDateString(),
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGarbageEntryData((prevData) => ({
          ...prevData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-green-800 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Make Garbage Request
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-2xl bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-5 font-bold text-center text-gray-800">
              Garbage Disposal Request
            </h1>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <Divider className="mb-6" />
            <br />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols- gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    value={mobileNumber}
                    name="mobileNumber"
                    onBlur={() => handleBlur("mobileNumber")}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      touched.mobileNumber &&
                      (!mobileNumber || !validatePhone(mobileNumber))
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-green-500 focus:ring focus:ring-green-200`}
                  />
                  {touched.mobileNumber &&
                    (!mobileNumber || !validatePhone(mobileNumber)) && (
                      <p className="text-red-600 text-sm mt-1">
                        * Invalid phone number. Must be 10 digits.
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Requested Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    readOnly
                    className="mt-1 p-3 w-full bg-gray-50 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Garbage Type
                  </label>
                  <select
                    value={typeOfGarbage}
                    name="typeOfGarbage"
                    onChange={handleChange}
                    className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                  >
                    <option value="default">Choose type</option>
                    <option value="Organic">Organic Waste</option>
                    <option value="Recyclable">Recyclable Waste</option>
                    <option value="Non-Recyclable">Non-Recyclable Waste</option>
                    <option value="Hazardous">Hazardous Waste</option>
                    <option value="E-Waste">E-Waste</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  name="address"
                  onBlur={() => handleBlur("address")}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className={`mt-1 p-3 w-full rounded-md border ${
                    !address && touched.address
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-green-500 focus:ring focus:ring-green-200`}
                />
                {!address && touched.address && (
                  <p className="text-red-600 text-sm mt-1">* Required</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={
                    !address || !mobileNumber || !validatePhone(mobileNumber)
                  }
                  className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md text-white ${
                    !address || !mobileNumber || !validatePhone(mobileNumber)
                      ? "bg-gray-300"
                      : "bg-green-700 hover:bg-green-600"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
                >
                  {isLoading ? "Adding..." : "Make Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
