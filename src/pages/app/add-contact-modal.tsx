import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { addContact } from "@/api/add-contact";
import Button from "@/components/button";
import Input from "@/components/input";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Warning from "@/components/warning";
import { formatarPhoneNumber as formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { Contact } from "@/types/shared/contact";

const editModalSchema = z.object({
  name: z.string().nonempty("O nome é obrigatorio"),
  description: z.string(),
  email: z.string().email("O e-mail é obrigatorio").nonempty(),
  phone: z
    .string()
    .min(14, "Número de telefone incompleto.")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Número de telefone inválido."),
});

type EditModalSchema = z.infer<typeof editModalSchema>;

const AddContactModal = () => {
  const queryClient = useQueryClient();

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
      email: "",
      name: "",
      phone: "",
    },
  });

  const name = watch("name");
  const description = watch("description");
  const email = watch("email");
  const phone = watch("phone");

  const { mutateAsync: addContactFn, isPending: isAddContactPending } =
    useMutation({
      mutationKey: ["get-contacts"],
      mutationFn: addContact,
      onMutate: async ({ name, email, phone, description }) => {
        await queryClient.cancelQueries({ queryKey: ["get-contacts"] });

        const oldContacts = queryClient.getQueryData<Contact[]>([
          "get-contacts",
        ]);

        const newContact: Omit<Contact, "userId"> = {
          id: Math.random(),
          name,
          email,
          phone,
          description,
          avatarUrl: null,
        };

        queryClient.setQueryData<Omit<Contact, "userId">[]>(
          ["get-contacts"],
          (old) => (old ? [...old, newContact] : [newContact]),
        );

        toast.success("Contato adicionado com sucesso!");

        return { oldContacts };
      },

      onError: (_, __, context) => {
        if (context?.oldContacts) {
          queryClient.setQueryData(["get-contacts"], context.oldContacts);
        }
        toast.error("Erro ao adicionar contato");
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["get-contacts"] });
      },
    });

  return (
    <DialogContent
      aria-describedby={undefined}
      className="bg-bg-p w-[380px] border-0"
    >
      <DialogTitle className="text-content-p text-xl font-bold">
        Adicionar contato
      </DialogTitle>
      <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="bg-bg-t text-content-body flex h-16 w-16 items-center justify-center rounded-xl">
          <User size={36} />
        </div>
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
            placeholder="Nome do contato"
            {...register("name")}
          />
          <Warning
            type="warning"
            content={(errors.name && errors.name?.message) ?? ""}
            done={!!errors.name}
            className="my-2 opacity-0"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-content-body text-md leading-5 font-semibold"
          >
            Descrição
          </label>
          <Input
            className={twMerge(
              "mt-2",
              description && "text-content-body",
              errors.description &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            id="description"
            placeholder="Descrição do contato"
            {...register("description")}
          />
          <Warning
            type="warning"
            content={(errors.description && errors.description?.message) ?? ""}
            done={!!errors.description}
            className="my-2 opacity-0"
          />
        </div>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
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
                  const formattedValue = formatPhoneNumber(noSpaces);
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
            placeholder="Email do contato"
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
              onClick={() => reset()}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="px-4"
              content="Salvar"
              type="button"
              disabled={!isValid || isAddContactPending}
              onClick={() => {
                addContactFn({
                  name,
                  description,
                  phone,
                  email,
                  avatarUrl: null,
                });

                reset();
              }}
            />
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default AddContactModal;
