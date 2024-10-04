import React from "react";

function driverSchedules() {
  const details = {
    date: "05/10/24",
    time: "12:00pm",
    area: "Malabe",
  };

  return (
    <div>
      <div className=" m-3 p-5 rounded-2xl bg-slate-200 shadow-xl">
        <div className="">
          <div className="flex justify-between h-[50%] items-center ">
            <h1 className="text-[28px] font-bold">{details.date}</h1>
            <h1 className="text-[24px] font-bold">{details.time}</h1>
          </div>
          <h1 className="text-[24px] font-bold text-[#2c7530]">{details.area} City</h1>
          <div className="flex justify-end">
          <button className=" mt-2 px-5 py-1 bg-[#2c7530] hover:bg-[#f9da78] text-white hover:text-black rounded-full">
            Start Collection
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default driverSchedules;
