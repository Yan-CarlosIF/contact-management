import Button from "@/components/button";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Contact } from "@/types/user";

// interface DeleteContactModalProps {
//   contact?: Pick<Contact, "name">;
// }

const DeleteContactModal = () => {
  return (
    <DialogContent className="bg-bg-p flex flex-col items-center border-0">
      <DialogTitle className="text-content-body font-semibold">
        Tem certeza que deseja excluir esse contato?
      </DialogTitle>
      <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
      <div className="mt-2 flex justify-center gap-[13px]">
        <DialogClose>
          <Button
            type="button"
            content="Cancelar"
            className="bg-bg-t not-disabled:hover:bg-accent-red text-content-p"
          />
        </DialogClose>
        <DialogClose asChild>
          <Button content="Confirmar" />
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default DeleteContactModal;
