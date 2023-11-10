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
    header: "dashboard",
    // icon: <DashboardOutlinedIcon />,
    child: [
      {
        path: "/",
        // element: <LandingPage/>,
        state: "dashboard.default",
      },
      {
        path: "/",
        // element: <LandingPage/>,
        state: "dashboard.one",
      }
    ],
  },
];

export default appRoutes;
