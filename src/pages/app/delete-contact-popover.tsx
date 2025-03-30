import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteContact } from "@/api/delete-contact";
import { Contact } from "@/api/get-contacts";
import Button from "@/components/button";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteContactModalProps {
  contact: Pick<Contact, "id">;
}

const DeleteContactPopover = ({ contact }: DeleteContactModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteContactFn } = useMutation({
    mutationKey: ["get-contacts"],
    mutationFn: deleteContact,
    onMutate({ id }) {
      const oldContacts = queryClient.getQueryData<Contact[]>(["get-contacts"]);

      queryClient.setQueryData<Contact[]>(["get-contacts"], (old) =>
        old?.filter((contact) => contact.id !== id),
      );

      toast.success("Contato excluído com sucesso!");
      return { oldContacts };
    },

    onError: (_, __, context) => {
      if (context?.oldContacts) {
        queryClient.setQueryData(["get-contacts"], context.oldContacts);
      }

      toast.error("Erro ao excluir contato");
    },
  });

  return (
    <DialogContent
      aria-describedby={undefined}
      className="bg-bg-p flex flex-col items-center border-0"
    >
      <DialogTitle className="text-content-body font-semibold">
        Tem certeza que deseja excluir esse contato?
      </DialogTitle>
      <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
      <div className="mt-2 flex justify-center gap-[13px]">
        <DialogClose asChild>
          <Button
            type="button"
            content="Cancelar"
            className="bg-bg-t not-disabled:hover:bg-accent-red text-content-p"
          />
        </DialogClose>
        <DialogClose asChild>
          <Button
            content="Confirmar"
            onClick={() => deleteContactFn({ id: contact.id })}
          />
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default DeleteContactPopover;
