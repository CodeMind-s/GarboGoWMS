import React, { useState } from "react";
import logo from "../../../assets/GarboGo.png";
import schedules from "../../../assets/icons/schedules.png";
import map from "../../../assets/icons/map.png";

import SchedulesComponent from "../components/driverSchedules"; // Uppercase and no .jsx needed
import MapComponent from "../components/driverMap";

function DriverDashboard() {
  const [isSchedules, setIsSchedules] = useState(true);
  const [isMap, setIsMap] = useState(false);

  const handleSchedulesClick = () => {
    setIsSchedules(true);
    setIsMap(false);
  };

  const handleMapClick = () => {
    setIsSchedules(false);
    setIsMap(true);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* header */}
      <div className="bg-gray-200 pt-5 pb-5">
        <div className="flex justify-center">
          <img src={logo} className="w-[200px]" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-[18px] font-bold">
            GarboGo Waste Management System
          </h1>
        </div>
      </div>

      {/* body */}
      <div className=" flex-grow">
      <div className=" flex justify-center my-4">
        <h1 className="text-[28px] font-bold text-[#48752c]">
          Driver Dashboard
        </h1>
      </div>
      <div className="">
        {isSchedules && <SchedulesComponent />}
        {isMap && <MapComponent />}
      </div>
      </div>
      {/* footer */}
      <div className="bg-[#f9da78] w-full flex justify-around font-bold text-[16px] border-t-4 border-[#48752c]">
        <div
          onClick={handleSchedulesClick}
          className={`flex flex-col justify-center items-center w-[50%] p-3 ${
            isSchedules ? "bg-[#2c75309d]" : ""
          }`}
        >
          <img src={schedules} className="w-[40px]" />
          <h1>Shedules</h1>
        </div>
        <div
          onClick={handleMapClick}
          className={`flex flex-col justify-center items-center w-[50%] p-3 ${
            isMap ? "bg-[#2c75309d]" : ""
          }`}
        >
          <img src={map} className="w-[40px]" />
          <h1>Map</h1>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
