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
        state: "add another admin",
      },
      {
        path: "/AdminPage",
        state: "Remove admin",
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
        state: "View Doctor Requests",
      },
      {
        path: "/Doctor/Remove",
        state: "Remove Doctor",
      },
      {
        path: "/admin/info",
        state: "ViewDoctorInfo",
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
      {
        path:"/hp",
        state:"Update Packages",

      },
      {
        path:"/hp",
        state:"Delete Packages",

      },
    ],
      
   

  },



  // {
  //   header: (
  //     <Typography variant="h6" fontWeight="bold">
  //       Family Members
  //     </Typography>
  //   ),
  //   child: [
  //     {
  //       path: "/patient/viewFamilyMembers",
  //       state: "Family members",
  //     },
  //     {
  //       path: "/patient/home",
  //       state: "make app",
  //     },
  //   ],
  // },
];

export default appRoutes;
