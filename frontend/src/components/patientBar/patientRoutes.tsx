import { ReactNode } from "react";
import HealingIcon from "@mui/icons-material/Healing";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
        Settings
      </Typography>
    ),
    child: [
      {
        path: "/changepasswordpatient",
        state: "Change Password",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Appointments
      </Typography>
    ),
    child: [
      {
        path: "/patient/viewDoctors",
        state: "Reserve An Appointment",
      },
      {
        path: "/patient/viewtodapp",
        state: "view today's appointments",
      },
      {
        path: "/patient/viewMyappointments",
        state: "View My Appointments",
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

      {
        path: "/patient/link",
        state: "link family member",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Health Packages
      </Typography>
    ),
    child: [
      {
        path: "/patient/healthPackages",
        state: "Health Packages",
      },
      {
        path: "/patient/packages",
        state: "My Packages",
      },
      {
        path: "/patient/subscribedPage",
        state: "Subscribed Packages",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Health Records
      </Typography>
    ),
    child: [
      {
        path: "/patient/viewMyhealthrecords",
        state: "View My Health Record",
      },
      {
        path: "/patient/walletAmount",
        state: "View My wallet",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" fontWeight="bold">
        Prescriptions
      </Typography>
    ),
    child: [
      {
        path: "/patient/prescriptions",
        state: "View prescriptions",
      },
    ],
  },
];
export default appRoutes;
