import { getConvById } from "../api";

export const getConversationQuery = (convId: string) => ({
  queryKey: ["conversation", convId],
  queryFn: async () => {
    const res = await getConvById(convId);
    // console.log("TODO: check the format", res);
    return res.data;
  },
});