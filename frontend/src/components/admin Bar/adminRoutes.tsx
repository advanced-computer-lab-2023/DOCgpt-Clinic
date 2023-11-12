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
       Patients
      </Typography>
    ),
    child: [
      {
        path: "/patient/Remove",
        state: "Remove Patient",
      },
      // {
      //   path: "/patient/home",
      //   state: "make app",
      // },
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
        path: "/Doctor/Remove",
        state: "Remove Doctor",
      },
      {
        path: "/admin/info",
        state: "ViewDoctorInfo",
      },
    ],
  },
];

export default appRoutes;
