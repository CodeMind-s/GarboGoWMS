import React, { useState, useEffect } from "react";
import AuthService from "../../../api/userApi";
import UserDrawer from "../components/UserDrawer";

import user from "../../../assets/user.png";
import email from "../../../assets/icons/email.png";
import phone from "../../../assets/icons/phone.png";
import address from "../../../assets/icons/location.png";
import dropdown from "../../../assets/icons/dropdown.png";

import Off40 from "../../../assets/vouchers/40off.png"
import Off50 from "../../../assets/vouchers/50off.png"
import Off60 from "../../../assets/vouchers/60off.png"
import Off70 from "../../../assets/vouchers/70off.png"

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToggleDropdownforInformation, setToggleDropdownforInformation] =
    useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await AuthService.getCurrentUserDetails();
        setProfile(userProfile);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdownforInformation = () => {
    setToggleDropdownforInformation(!isToggleDropdownforInformation);
  };

  return (
    <UserDrawer>
      <div className="flex items-center justify-center ">
        <div className="  w-[100%] h-full p-5 flex items-start justify-center">
          <div className=" w-[50%]">
            <div className="h-auto rounded border-[3px] p-5 m-4 border-[#48752c]">
              <div className="flex justify-between items-center">
                <h1 className=" font-bold text-[21px] my-1">
                  Update Personal Information
                </h1>
                <img
                  src={dropdown}
                  alt="dropdown"
                  className={`w-[20px] h-[20px] cursor-pointer transition-transform duration-300 ${
                    isToggleDropdownforInformation ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={toggleDropdownforInformation}
                />
              </div>
              {isToggleDropdownforInformation && (
                <div>
                  <div className="flex flex-col justify-around space-y-2">
                    <h1 className="font-bold">Name: </h1>
                    <input
                      type="text"
                      name="name"
                      value={profile.username}
                      onChange={handleInputChange}
                      placeholder={
                        profile.username ? profile.username : "Enter your name"
                      }
                      className="py-2 px-5 bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                    <h1 className="font-bold">Email: </h1>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      placeholder={
                        profile.email ? profile.email : "Enter your email"
                      }
                      className="py-2 px-5 bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                  </div>
                  <div className="flex flex-col justify-around space-y-2">
                    <h1 className="font-bold">Gender: </h1>
                    <div className="flex items-center space-x-4 space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={profile.gender === "Male"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Male
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={profile.gender === "Female"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Female
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          checked={profile.gender === "Other"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Other
                      </label>
                    </div>
                    <h1 className="font-bold">Contact Number: </h1>
                    <input
                      type="text"
                      name="contact"
                      value={profile.contact}
                      onChange={handleInputChange}
                      placeholder={
                        profile.contact
                          ? profile.contact
                          : "Enter your contact number"
                      }
                      className="py-2 px-5 bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                  </div>
                  <div className="items-center flex flex-col justify-center">
                    <div className="w-full my-2">
                      <h1 className="font-bold">Current Address: </h1>
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        placeholder={
                          profile.address
                            ? profile.address
                            : "Enter your address"
                        }
                        className="py-2 px-5 w-full bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                      />
                    </div>
                  </div>
                  <div className="mt-5 bg-[#f9da78] text-[16px] rounded-full inline-block">
                    <button className="px-5 py-2 text-center text-black">
                      Update Information
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-auto rounded border-[3px] p-5 m-4 border-[#48752c]">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-[21px]">Change Password</h1>
                <img
                  src={dropdown}
                  alt="dropdown"
                  className={`w-[20px] h-[20px] cursor-pointer transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={toggleDropdown}
                />
              </div>

              {isDropdownOpen && (
                <div className="items-center flex flex-col justify-center">
                  <div className="w-[90%] my-2">
                    <h1 className="font-bold">Current Password:</h1>
                    <input
                      type="password"
                      name="currentPassword"
                      value={profile.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Current Password"
                      className="py-2 px-5 w-full bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                  </div>
                  <div className="w-[90%] my-2">
                    <h1 className="font-bold">New Password:</h1>
                    <input
                      type="password"
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleInputChange}
                      placeholder="New Password"
                      className="py-2 px-5 w-full bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                  </div>
                  <div className="w-[90%] my-2">
                    <h1 className="font-bold">Confirm Password:</h1>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={profile.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm New Password"
                      className="py-2 px-5 w-full bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                  </div>
                  <div className="mt-5 bg-[#f9da78] text-[16px] rounded-full inline-block">
                    <button className="px-5 py-2 text-center text-black">
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-4  w-[50%] rounded border-[3px] border-[#48752c] p-5 ">
            <div className="flex justify-between w-full ">
              <div className="w-[30%] my-5 justify-center flex ">
                <img
                   src={profile?.profileImage || user}
                  alt="Profile Picture"
                  className="w-[120px] h-[120px] rounded-full"
                />
              </div>

              <div className="w-[70%] justify-center flex">
                <div className=" flex flex-col">
                  <div className="">
                    <img
                      src={address}
                      alt="Logo"
                      className="mx-auto w-[20px] h-[20px] mr-4 my-4 inline-block"
                    />
                    <span>{profile.address}</span>
                  </div>
                  <div className="">
                    <img
                      src={email}
                      alt="Logo"
                      className="mx-auto w-[20px] h-[20px] mr-4 my-4 inline-block"
                    />
                    <span>{profile.email}</span>
                  </div>
                  <div className="">
                    <img
                      src={phone}
                      alt="Logo"
                      className="mx-auto w-[20px] h-[20px] mr-4 my-4 inline-block"
                    />
                    <span>{profile.contact}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" my-2 w-[95%] bg-[#f9da78] text-center  rounded-3xl shadow-lg p-3">
              <h1 className="text-[24px] py-1 text-[#48752c] font-bold">
                {profile.username}
              </h1>
            </div>
            <div className="my-2 w-[95%] bg-[#f9da78] text-center  rounded-3xl shadow-lg p-2">
              <h1 className="text-[24px] font-bold  text-[#48752c] ">
                {profile.ecoscore}
              </h1>
              <h1 className="text-[18px] ">Eco Score Points</h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[95%] mx-auto ">
        <h1 className=" text-[#48752c] text-xl font-semibold">Redeem Vouchers</h1>
        <div className=" w-full">
          <div className=" flex justify-between items-center mt-5">
            <div className=" w-[48%] flex justify-start">
              <div className=" w-[90%] relative">
                <img src={Off40} alt='40%off' className=" w-full h-auto rounded-xl"/>
                {profile.ecoscore < 500 && (<div className=" bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                  <img width="50" height="50" src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png" alt="external-lock-call-to-action-bearicons-glyph-bearicons"/>
                  <span className=" text-[#f9da78] text-sm mt-2">You need only {500 - profile.ecoscore} ECO points to unlock Voucher</span>
                </div>)}
              </div>
              <div className=" h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore > 500 && (<div className=" py-5 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>COLLECT</div>)}
              </div>
            </div>
            
            <div className=" w-[48%] flex justify-start">
              <div className=" w-[90%] relative">
                <img src={Off50} alt='50%off' className=" w-full h-auto rounded-xl"/>
                {profile.ecoscore < 1000 && (<div className=" bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                  <img width="50" height="50" src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png" alt="external-lock-call-to-action-bearicons-glyph-bearicons"/>
                  <span className=" text-[#f9da78] text-sm mt-2">You need only {1000 - profile.ecoscore} ECO points to unlock Voucher</span>
                </div>)}
              </div>
              <div className=" h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore > 1000 && (<div className=" py-5 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>COLLECT</div>)}
              </div>
            </div>
          </div>
          <div className=" flex justify-between items-center mt-5">
            <div className=" w-[48%] flex justify-start">
              <div className=" w-[90%] relative">
                <img src={Off60} alt='60%off' className=" w-full h-auto rounded-xl"/>
                {profile.ecoscore < 1500 && (<div className=" bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                  <img width="50" height="50" src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png" alt="external-lock-call-to-action-bearicons-glyph-bearicons"/>
                  <span className=" text-[#f9da78] text-sm mt-2">You need only {1500 - profile.ecoscore} ECO points to unlock Voucher</span>
                </div>)}
              </div>
              <div className=" h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore > 1500 && (<div className=" py-5 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>COLLECT</div>)}
              </div>
            </div>
            <div className=" w-[48%] flex justify-start">
              <div className=" w-[90%] relative">
                <img src={Off70} alt='70%off' className=" w-full h-auto rounded-xl"/>
                {profile.ecoscore < 2000 && (<div className=" bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                  <img width="50" height="50" src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png" alt="external-lock-call-to-action-bearicons-glyph-bearicons"/>
                  <span className=" text-[#f9da78] text-sm mt-2">You need only {2000 - profile.ecoscore} ECO points to unlock Voucher</span>
                </div>)}
              </div>
              <div className=" h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore > 2000 && (<div className=" py-5 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>COLLECT</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDrawer>
  );
};

export default UserProfile;
