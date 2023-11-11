import { ReactNode } from "react";
import HealingIcon from "@mui/icons-material/Healing";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate



export type RouteType = {
  header: any;
  child: links[];
  sidebarProps?: {
    icon?: ReactNode;
  };
};

export type links = {
  state: string;
  icon?: ReactNode;
  path: string;
  element?: ReactNode;
};

const appRoutes: RouteType[] = [
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Doctors
      </Typography>
    ),
    child: [
      {
        path: "/patient/home",
        state: "viewDoctors",
      },
      {
        path: "/patient/home",
        state: "make app",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Family Members
      </Typography>
    ),
    child: [
      {
        path: "/patient/viewFamilyMembers",
        state: "Family members",
      },
     
    ],
  },
];
export default appRoutes;
