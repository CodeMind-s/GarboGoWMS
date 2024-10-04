import React, { useState, useEffect } from "react";
import UserDrawer from "../components/UserDrawer";
import AuthService from "../../../api/userApi";
import { getUserAllGarbages } from "../../../api/garbageApi";
import { getUserAllInquiries } from "../../../api/inquiryApi";

//MUI Icons
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ScoreIcon from "@mui/icons-material/Score";
import { set } from "mongoose";
import GarbageMap from "../components/GarbageMap";

const UserDashbord = () => {
  const [garbageCount, setGarbageCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [ecoscore, setEcoscore] = useState(0);

  const fetchProfile = async () => {
    try {
      const userProfile = await AuthService.getCurrentUserDetails();
      setEcoscore(userProfile.ecoscore);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAllGarbages = async () => {
    try {
      const res = await getUserAllGarbages();
      setGarbageCount(res.length);
    } catch (error) {
      console.error("Error fetching garbages: ", error.message);
    }
  };

  const fetchAllInquiries = async () => {
    try {
      const res = await getUserAllInquiries();
      setInquiryCount(res.length);
    } catch (error) {
      console.error("Error fetching inquiries: ", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAllGarbages();
    fetchAllInquiries();
  }, []);

  return (
    <UserDrawer>
      <div className="p-5">
        <main className="h-full overflow-y-auto">
          <div className="container mx-auto grid">
            <div className="grid gap-6 mb-8 md:grid-cols-3 ">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
                <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full :text-teal-100 :bg-teal-500">
                  <ScoreIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="mb-2 text-sm font-medium text-gray-600 :text-gray-400">
                    My Eco Score
                  </p>
                  <p className="text-[50px] font-semibold text-gray-700 :text-gray-200">
                    {ecoscore}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 py-10 bg-white rounded-lg shadow-xs :bg-gray-800">
                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full :text-orange-100 :bg-orange-500">
                  <SupportAgentIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="mb-2 text-sm font-medium text-gray-600 :text-gray-400">
                    My Inquiries
                  </p>
                  <p className="text-[50px] font-semibold text-gray-700 :text-gray-200">
                    {inquiryCount}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full :text-green-100 :bg-green-500">
                  <DeleteSweepIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="mb-2 text-sm font-medium text-gray-600 :text-gray-400">
                    My Garbage Requests
                  </p>
                  <p className="text-[50px] font-semibold text-gray-700 :text-gray-200">
                    {garbageCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </UserDrawer>
  );
};

export default UserDashbord;
