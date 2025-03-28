import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import Button from "@/components/button";
import Input from "@/components/input";
import LabelButton from "@/components/label-button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Warning from "@/components/warning";
import { formatarPhoneNumber } from "@/helpers/formatPhoneNumber";

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

const AddContactModal = () => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    control,
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
  const email = watch("email");
  const phone = watch("phone");

  return (
    <DialogContent className="bg-bg-p w-[345px] border-0">
      <DialogTitle className="text-content-p text-xl font-bold">
        Adicionar contato
      </DialogTitle>
      <div className="bg-content-muted h-[0.5px] w-full opacity-40"></div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="bg-bg-t text-content-body flex h-16 w-16 items-center justify-center rounded-xl">
          <User size={36} />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <LabelButton className="w-36 gap-1 py-3 text-sm font-semibold">
              <Upload size={14} />
              Adicionar foto
            </LabelButton>
          </DialogTrigger>
          <AvatarChangeModal />
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
                  console.log(fieldState.error);
                  const semEspacos = e.target.value.replace(/\s/g, "");
                  const valorFormatado = formatarPhoneNumber(semEspacos);
                  field.onChange(valorFormatado);
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
          <Button
            type="button"
            content="Cancelar"
            className="bg-bg-t not-disabled:hover:bg-accent-red text-content-p"
          />
          <Button content="Salvar" type="submit" disabled={!isValid} />
        </div>
      </form>
    </DialogContent>
  );
};

export default AddContactModal;
