import React from "react";
import Authentication from "../components/Authentication";
import { AuthProvider } from "../context/Authcontext";

const AuthPage = () => {
  return (
    <div>
        <Authentication />
    </div>
  );
};

export default AuthPage;
