import Navbar2 from "../components/Navbar2";
import Room1 from "../components/Room1";
import Room2 from "../components/Room2";
import Footer from "../components/Footer";
import React from "react";

const RoomsPage = () => {
  console.log("hello1");
  return (
    <div>
     
     <Navbar2   />
     <Room1/>
     <Room2/>
     <Footer/>
     
    </div>
  );
};

export default RoomsPage;