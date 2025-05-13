import { createContext } from "react";
import type { UserAttributes } from "../types/user.type";

type UserContextType = {
  user: UserAttributes | null;
  setUser: (user: UserAttributes | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
