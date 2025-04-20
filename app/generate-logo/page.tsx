"use client";

import { useContext } from "react";
import { UserDetailContext } from "../_context/userDetailContext";

function GenerateLogo() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  console.log(userDetails);
  return <div>GenerateLogo</div>;
}
export default GenerateLogo;
