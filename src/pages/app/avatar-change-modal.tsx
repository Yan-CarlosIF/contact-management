import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateAvatar } from "@/api/update-avatar";
import Button from "@/components/button";
import Input from "@/components/input";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/types/shared/contact";

const avatarChangeModalSchema = z.object({
  linkAvatar: z.string().nullable(),
});

type AvatarChangeModalData = z.infer<typeof avatarChangeModalSchema>;

interface AvatarChangeModalProps {
  contact: Pick<Contact, "id" | "avatarUrl">;
}

const AvatarChangeModal = ({ contact }: AvatarChangeModalProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<AvatarChangeModalData>({
    mode: "all",
    resolver: zodResolver(avatarChangeModalSchema),
  });

  const onSubmit = (data: AvatarChangeModalData) => {
    updateAvatarFn({ avatarUrl: data.linkAvatar, id: contact.id });
  };

  const { mutateAsync: updateAvatarFn } = useMutation({
    mutationKey: ["get-contacts"],
    mutationFn: updateAvatar,
    onMutate: ({ avatarUrl, id }) => {
      const oldContacts = queryClient.getQueryData<Contact[]>(["get-contacts"]);

      queryClient.setQueryData<Contact[]>(["get-contacts"], (oldContacts) => {
        if (oldContacts) {
          return oldContacts.map((contact) => {
            if (contact.id === id) {
              return {
                ...contact,
                avatarUrl,
              };
            }
            return contact;
          });
        }
      });

      toast.success("Imagem alterada com sucesso!");
      return { oldContacts };
    },
    onError: (_, __, context) => {
      if (context?.oldContacts) {
        queryClient.setQueryData(["get-contacts"], context.oldContacts);
      }

      toast.error("Erro ao alterar imagem");
    },
  });

  const handleCancelButtonClick = async () => {
    await updateAvatarFn({ avatarUrl: null, id: contact.id });
  };

  return (
    <DialogContent aria-describedby={undefined} className="bg-bg-p border-0">
      <DialogTitle className="text-content-body font-semibold">
        Link da Imagem
      </DialogTitle>
      <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Insira o link da imagem"
          {...register("linkAvatar")}
        />
        <div className="mt-4 flex justify-end gap-[13px]">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-bg-t not-disabled:hover:bg-accent-red text-content-p"
              content={contact?.avatarUrl ? "Excluir" : "Cancelar"}
              onClick={handleCancelButtonClick}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button content="Salvar" type="submit" />
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default AvatarChangeModal;
