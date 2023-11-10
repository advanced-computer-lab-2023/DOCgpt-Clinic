import { ReactNode } from "react";
import HealingIcon from "@mui/icons-material/Healing";


export type RouteType = {
  header: string;
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
    header: "Doctors",
    // icon: <DashboardOutlinedIcon />,
    child: [
      {
        path: "/patient/home",
        // element: <LandingPage/>,
        state: "viewDoctors",
      },
      {
        path: "/patient/home",
        // element: <LandingPage/>,
        state: "lmake app",
      }
    ],
  },
];

export default appRoutes;
