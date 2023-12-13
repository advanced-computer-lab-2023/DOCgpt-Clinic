import { ReactNode } from "react";
import HealingIcon from "@mui/icons-material/Healing";
import { Typography } from "@mui/material";


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
       Admins
      </Typography>
    ),
    child: [
      {
        path: "/AdminPage",
        state: " All Admins",
      },
   
   
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Doctors
      </Typography>
    ),
    child: [
      {
        path: "/requests",
        state: "Doctor Requests",
      },
      {
        path: "/Doctor/Remove",
        state: "Remove Doctor",
      },
      {
        path: "/admin/info",
        state: "Doctors Info",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
       Patients
      </Typography>
    ),
    child: [
      {
        path: "/patient/Remove",
        state: "Remove Patient",
      },
   
    ],
  },

  {
    header: (
      <Typography variant="h6" fontWeight="bold">
       Packages
      </Typography>
    ),
    child: [
      {
        path: "/hp",
        state: "Health Packages",
      },
      {
        path: "/patient/PackagesPage",
        state: "Add Packages",
      },
      
    ],
      
   

  },



];

export default appRoutes;
