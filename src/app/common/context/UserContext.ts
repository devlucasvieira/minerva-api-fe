import React from "react";
import {User} from "../model/User";

export const UserContext = React.createContext<User>({} as User);