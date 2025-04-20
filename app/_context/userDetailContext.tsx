import { createContext } from "react";
import { UserDetailContextType } from "@/types";

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetails: null,
  setUserDetails: () => {},
});
