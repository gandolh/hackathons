import { createBrowserRouter, redirect } from "react-router"
import { queryClient } from "@/lib/queryClient"
import Dashboard from "../components/Dashboard"
import { Home } from "../components/Home"
import { AuthPage } from "@/modules/auth/components/AuthPage"
import { getConversationQuery } from "../querries"

const requireGuest = () => {
  if (localStorage.getItem("token")) return redirect("/")
  return null
}

const checkConvId = () => {
  if (!localStorage.getItem("token")) return redirect("/login")
  const convId = localStorage.getItem("convId")
  return convId ? redirect("/dashboard") : null
}

export const HomeRoutes = [
  {
    path: "/login",
    element: <AuthPage mode="login" />,
    loader: requireGuest,
  },
  {
    path: "/register",
    element: <AuthPage mode="register" />,
    loader: requireGuest,
  },
  {
    path: "/",
    element: <Home />,
    loader: checkConvId,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: async () => {
      if (!localStorage.getItem("token")) return redirect("/login")
      const convId = localStorage.getItem("convId")
      if (!convId) return redirect("/")
      await queryClient.ensureQueryData(getConversationQuery(convId))
      return null
    },
  },
]

export const router = createBrowserRouter(HomeRoutes)
