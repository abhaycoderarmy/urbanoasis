import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterFormChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        registerFormData
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      
      alert(error.response.data.message);
    }
  };

  // cheking is user is getting login or not
  const userLogger = async (e) => {
    e.preventDefault();
    console.log(loginFormData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        loginFormData,
        { withCredentials: true }
      );
      setUserLoggedIn(true);
      if(res.status==200){
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  

  // logging out the user by clearing the cookies
  const userLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      });

      setUserLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // to check if the user is authenticated or not
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/users/isAuthenticated",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setUserLoggedIn(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Specifically handle unauthorized access
          setUserLoggedIn(false);
        } else {
          console.error("Error during authentication check:", error);
        }
      }
    };

    checkAuthStatus();
  }, []);

  const toggleForm = () => setIsLogin(!isLogin);
  const toggleLoginType = (isAdmin) => setIsAdminLogin(isAdmin);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    idNumber: "",
    idType: "Passport",
    dob: "",
    roomType: "Deluxe",
    checkInDate: "",
    checkOutDate: "",
  });

  // const

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isAdminLogin,
        userLoggedIn,
        registerFormData,
        loginFormData,
        handleRegisterFormChange,
        handleLoginFormChange,
        handleRegisterFormSubmit,
        userLogger,
        toggleForm,
        toggleLoginType,
        setUserLoggedIn,
        userLogout,
        formData,
        setFormData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
