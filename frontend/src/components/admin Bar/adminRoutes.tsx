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
      <Typography variant="h6" >
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
      <Typography variant="h6" >
        Doctors
      </Typography>
    ),
    child: [
      {
        path: "/requests",
        state: "Doctor Requests",
      },
      {
        path: "/alldoc",
        state: "All Doctors",
      },
      {
        path: "/admin/info",
        state: "Doctors Info",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" >
       Patients
      </Typography>
    ),
    child: [
      {
        path: "/allpat",
        state: " All Patients",
      },
   
    ],
  },

  {
    header: (
      <Typography variant="h6" >
       Packages
      </Typography>
    ),
    child: [
      {
        path: "/hp",
        state: "Health Packages",
      },
     
      
    ],
      
   

  },



];

export default appRoutes;
