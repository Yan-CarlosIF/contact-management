import { api } from "@/lib/axios";

export async function deleteContact({ contactId }: { contactId: number }) {
  await api.delete("/contacts", { data: { contactId } });
}
