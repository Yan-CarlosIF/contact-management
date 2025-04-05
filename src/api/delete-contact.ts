import { api } from "@/lib/axios";

export async function deleteContact({ contactId }: { contactId: number }) {
  await api.delete("/contact/delete", { data: { contactId } });
}
