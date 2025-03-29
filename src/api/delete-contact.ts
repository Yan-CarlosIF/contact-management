import { api } from "@/lib/axios";

export async function deleteContact({ id }: { id: number }) {
  await api.delete("/deleteContact", { data: { id } });
}
  