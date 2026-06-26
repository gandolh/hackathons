import { useQuery } from "@tanstack/react-query"
import { getConversationQuery } from "../querries"
import type { DashboardData } from "@yapp/shared"

export function useConvStats() {
  const convId = window.localStorage.getItem("convId")
  if (!convId) throw new Error("convId is required")
  return useQuery<DashboardData>(getConversationQuery(convId))
}
