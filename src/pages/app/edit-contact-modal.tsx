import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { updateAvatar } from "@/api/update-avatar";
import { updateContact } from "@/api/update-contact";
import userModal from "@/assets/user_img_modal.svg";
import Button from "@/components/button";
import Input from "@/components/input";
import LabelButton from "@/components/label-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Warning from "@/components/warning";
import { formatarPhoneNumber } from "@/helpers/formatPhoneNumber";
import { Contact } from "@/types/shared/contact";

import AvatarChangeModal from "./avatar-change-modal";

const editModalSchema = z.object({
  name: z.string().nonempty("O nome é obrigatorio"),
  email: z.string().email("O e-mail é obrigatorio").nonempty(),
  phone: z
    .string()
    .min(14, "Número de telefone incompleto.")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Número de telefone inválido."),
});

type EditModalSchema = z.infer<typeof editModalSchema>;

interface editContactModalProps {
  contact: Pick<Contact, "name" | "email" | "phone" | "avatarUrl" | "id">;
}

const EditContactModal = ({ contact }: editContactModalProps) => {
  const queryClient = useQueryClient();
  const [originalAvatar, setOriginalAvatar] = useState(contact.avatarUrl);

  const {
    register,
    watch,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<EditModalSchema>({
    mode: "all",
    resolver: zodResolver(editModalSchema),
    defaultValues: {
      email: contact.email,
      name: contact.name,
      phone: contact.phone,
    },
  });

  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");

  const { mutateAsync: editContactFn } = useMutation({
    mutationKey: ["get-contacts"],
    mutationFn: updateContact,
    onMutate: ({ id, name, email, phone }) => {
      const oldContacts = queryClient.getQueryData<Contact[]>(["get-contacts"]);

      queryClient.setQueryData<Contact[]>(["get-contacts"], (oldContacts) => {
        if (oldContacts) {
          return oldContacts.map((contact) => {
            if (contact.id === id) {
              return {
                ...contact,
                name,
                email,
                phone,
              };
            }
            return contact;
          });
        }
      });

      toast.success("Contato editado com sucesso!");
      return { oldContacts };
    },

    onError: (_, __, context) => {
      if (context?.oldContacts) {
        queryClient.setQueryData(["get-contacts"], context.oldContacts);
      }

      toast.error("Erro ao editar contato");
    },
  });

  const { mutateAsync: revertAvatarFn } = useMutation({
    mutationKey: ["get-contacts"],
    mutationFn: updateAvatar,
    onMutate: ({ id, avatarUrl }) => {
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

      return { oldContacts };
    },

    onError: (_, __, context) => {
      if (context?.oldContacts) {
        queryClient.setQueryData(["get-contacts"], context.oldContacts);
      }

      toast.error("Erro ao cancelar a alteração do avatar");
    },
  });

  const handleCancelButtonClick = async () => {
    await revertAvatarFn({ avatarUrl: originalAvatar, id: contact.id });
    reset({
      email: contact.email,
      name: contact.name,
      phone: contact.phone,
    });
  };

  const handleSaveButtonClick = async () => {
    await editContactFn({ id: contact.id, name, email, phone });
    setOriginalAvatar(contact.avatarUrl);
  };

  return (
    <DialogContent
      aria-describedby={undefined}
      className="bg-bg-p w-[345px] border-0"
    >
      <DialogTitle className="text-content-p text-xl font-bold">
        Editar contato
      </DialogTitle>
      <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <img
          className="h-16 w-16 rounded-2xl"
          src={contact.avatarUrl ?? userModal}
          alt="Avatar do contato"
          onError={(e) => (e.currentTarget.src = userModal)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <LabelButton className="w-36 gap-1 py-3 text-sm font-semibold">
              <Upload size={14} />
              {contact.avatarUrl ? "Alterar foto" : "Adicionar foto"}
            </LabelButton>
          </DialogTrigger>
          <AvatarChangeModal contact={contact} />
        </Dialog>
      </div>

      <form className="mt-3">
        <div>
          <label
            htmlFor="name"
            className="text-content-body text-md leading-5 font-semibold"
          >
            Nome
          </label>
          <Input
            className={twMerge(
              "mt-2",
              name && "text-content-body",
              errors.name &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            id="name"
            placeholder="Como você se chama?"
            {...register("name")}
          />
          <Warning
            type="warning"
            content={(errors.name && errors.name?.message) ?? ""}
            done={!!errors.name}
            className="my-2 opacity-0"
          />
        </div>
        <Controller
          name="phone"
          control={control}
          defaultValue={contact.phone}
          rules={{
            pattern: {
              value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
              message: "Número de telefone inválido.",
            },
          }}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="phone"
                className="text-content-body text-md leading-5 font-semibold"
              >
                Telefone
              </label>
              <Input
                {...field}
                className={twMerge(
                  "mt-2",
                  phone && "text-content-body",
                  fieldState.error &&
                    "border-accent-red focus:border-accent-red hover:border-accent-red",
                )}
                id="phone"
                type="tel"
                placeholder="Número de telefone"
                onChange={(e) => {
                  const noSpaces = e.target.value.replace(/\s/g, "");
                  const formattedValue = formatarPhoneNumber(noSpaces);
                  field.onChange(formattedValue);
                }}
              />
              <Warning
                type="warning"
                content={fieldState.error?.message ?? ""}
                done={!!fieldState.error}
                className="my-2 opacity-0"
              />
            </div>
          )}
        />

        <div>
          <label
            htmlFor="email"
            className="text-content-body text-md leading-5 font-semibold"
          >
            E-mail
          </label>
          <Input
            className={twMerge(
              "mt-2",
              email && "text-content-body",
              errors.email &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            id="email"
            type="email"
            placeholder="Seu e-mail aqui"
            {...register("email")}
          />
          <Warning
            type="warning"
            content={(errors.email && errors.email?.message) ?? ""}
            done={!!errors.email}
            className="my-2 opacity-0"
          />
        </div>

        <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
        <div className="mt-4 flex justify-end gap-[13px]">
          <DialogClose asChild>
            <Button
              type="button"
              content="Cancelar"
              className="bg-bg-t not-disabled:hover:bg-accent-red text-content-p"
              onClick={handleCancelButtonClick}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              content="Salvar"
              type="button"
              disabled={!isValid}
              onClick={handleSaveButtonClick}
            />
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditContactModal;
