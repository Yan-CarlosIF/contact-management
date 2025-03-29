import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/button";
import Input from "@/components/input";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/types/user";

const avatarChangeModalSchema = z.object({
  linkAvatar: z.string().nullable(),
});

type AvatarChangeModalData = z.infer<typeof avatarChangeModalSchema>;

interface AvatarChangeModalProps {
  contact?: Pick<Contact, "avatar_url">;
}

const AvatarChangeModal = ({ contact }: AvatarChangeModalProps) => {
  const { register, handleSubmit } = useForm<AvatarChangeModalData>({
    mode: "all",
    resolver: zodResolver(avatarChangeModalSchema),
  });
  
  const onSubmit = (data: AvatarChangeModalData) => {
    if (!contact) return;
    if (data.linkAvatar === "") data.linkAvatar = null;

    contact.avatar_url = data.linkAvatar;
    console.log(contact.avatar_url);
  };

  const handleCancelButtonClick = () => {
    if (contact?.avatar_url) contact.avatar_url = null;
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
              content={contact?.avatar_url ? "Excluir" : "Cancelar"}
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
