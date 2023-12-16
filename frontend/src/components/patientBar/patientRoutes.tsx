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
      <Typography variant="h6">
        Appointments
      </Typography>
    ),
    child: [
      {
        path: "/patient/viewDoctors",
        state: "Reserve An Appointment",
      },
      {
        path: "/patient/viewMyappointments",
        state: "My Appointments",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" >
        Prescriptions
      </Typography>
    ),
    child: [
      {
        path: "/patient/prescriptions",
        state: "My Prescriptions",
      },
    ],
  },
  {
    header: (
      <Typography variant="h6" >
        Health Packages
      </Typography>
    ),
    child: [
      {
        path: "/patient/healthPackages",
        state: "Health Packages",
      },
      {
        path: "/patient/subscribedPage",
        state: "My Subscribed Packages",
      },
      {
        path: "/patient/packages",
        state: "My Packages History",
      },
      
    ],
  },
  {
    header: (
      <Typography variant="h6" >
        Health Records
      </Typography>
    ),
    child: [
      {
        path: "/patient/viewMyhealthrecords",
        state: "My Health Record",
      },
    
    ],
  },
  {
    header: (
      <Typography variant="h6" >
        Family Members
      </Typography>
    ),
    child: [
      {
        path: "/patient/viewFamilyMembers",
        state: "Family Members",
      },

      {
        path: "/patient/link",
        state: "Link Family Member",
      },
      {
        path: "/patient/famMemAppointments",
        state: "Appointments",
      },
      {
        path: "/family-packages",
        state: "Packages",
      },
     
    ],
  },
];
export default appRoutes;
