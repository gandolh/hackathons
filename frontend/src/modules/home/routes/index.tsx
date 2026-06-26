import { createBrowserRouter, redirect } from "react-router";
import { queryClient } from "@/lib/queryClient";
import Dashboard from "../components/Dashboard";
import { Home } from "../components/Home";
import { getConversationQuery } from "../querries";

const checkConvId = () => {
  const convId = window.localStorage.getItem("convId");
  return convId ? redirect("/dashboard") : null;
};

export const HomeRoutes = [
  {
    path: "/",
    element: <Home />,
    loader: checkConvId,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: async () => {
      const convId = window.localStorage.getItem("convId");
      if (!convId) return redirect("/");

      await queryClient.ensureQueryData(getConversationQuery(convId));

      return null;
    },
  },
];

export const router = createBrowserRouter(HomeRoutes);
