import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../../../assets/GarboGo.png";
import AuthService from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

function Register() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUserName] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const [userEntryData, setUserEntryData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    ecoscore: "",
    address: "",
    contact: "",
  });

  const { username, email, password, gender, ecoscore, address, contact } =
    userEntryData;

  const [touched, setTouched] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUserEntryData({
      ...userEntryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newUserEntry = {
      username,
      email,
      password,
      gender,
      ecoscore: "150",
      address,
      contact,
    };
    try {
      // Simulate submission (you could replace this with your API call)
      // console.log(`newUserEntry => `, newUserEntry);
      await AuthService.register(newUserEntry); // Assuming you have this function

      toast.success("Your Account has been created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSubmit(true);
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
      // navigate("/login");
    }
  };

  return (
    <div>
      <section className="bg-transparent w-screen h-auto flex justify-center items-center z-50">
        <div className="bg-[#252525] w-[40%] h-auto my-8 rounded-3xl shadow-lg shadow-gray-900 p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-between"
          >
            <div>
              <img src={logo} alt="Logo" className="mx-auto w-[80%] " />
            </div>
            <h1 className="text-center font-bold text-[36px] text-[#f9da78] mb-8">
              Sign Up
            </h1>

            <div className="w-[80%] flex flex-col justify-between">
              <div className="my-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter name"
                  value={username}
                  onChange={handleChange}
                  // onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 border rounded w-full"
                  value={email}
                  placeholder="Enter Email Address"
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label className="block text-sm font-medium text-white">
                  Gender
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="form-radio text-blue-600"
                      checked={gender === "Male"}
                      onChange={handleChange} // Handles the change event
                    />
                    <span className="ml-2 text-white">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="form-radio text-blue-600"
                      checked={gender === "Female"}
                      onChange={handleChange} // Handles the change event
                    />
                    <span className="ml-2 text-white">Female</span>
                  </label>
                </div>
              </div>
              <div className="my-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 p-2 border rounded w-full"
                  value={address}
                  placeholder="Enter current Address"
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-white"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="mt-1 p-2 border rounded w-full"
                  value={contact}
                  placeholder="Enter Contact Number"
                  onChange={handleChange}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 border rounded w-full"
                  value={password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-2">
                {/* <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium text-white"
                >
                  Confirm Password
                </label> */}
                {/* <input
                  type="password"
                  id="confirmpassword"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                /> */}
              </div>
              <div className="flex">
                <p className="text-[#f9da78]">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#48752c] hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="bg-[#48752c] text-[#f9da78] p-2 my-8 text-[24px] w-[50%] rounded cursor-pointer"
              isLoading={isLoading}
            >
              Sign Up
              <ToastContainer />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
