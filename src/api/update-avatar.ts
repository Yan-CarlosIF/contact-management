import { api } from "@/lib/axios";

type UpdateAvatarSchema = {
  id: number;
  avatarUrl: string | null;
};

export function updateAvatar({ avatarUrl, id }: UpdateAvatarSchema) {
  return api.patch<UpdateAvatarSchema>(`/contacts/update-avatar`, {
    avatarUrl,
    id,
  });
}
