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
        appoinments
      </Typography>
    ),
    child: [
      {
        path: "/doctor/time",
        state: "add time slots ",
      },
      {
        path: "/doctor/appointments",
        state: "View my appointments",
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
        path: "/doctor/patients",
        state: "View My Patients",
      },
    ],
  },
];
export default appRoutes;