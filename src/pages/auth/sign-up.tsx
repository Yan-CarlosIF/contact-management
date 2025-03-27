import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";

import Button from "../../components/button";
import Input from "../../components/input";
import LinkComponent from "../../components/link";
import Warning from "../../components/warning";

const signUpSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatorio"),
    email: z.string().email("O e-mail é obrigatorio").nonempty(),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(
        /[^a-zA-Z\s]/,
        "A senha deve conter pelo menos um caractere especial ou número",
      )
      .nonempty("A senha é obrigatoria"),
    confirmPassword: z
      .string()
      .min(1, "A confirmação de senha deve ter pelo menos 8 caracteres")
      .nonempty("A confirmação de senha é obrigatoria"),
  })
  .refine(
    (data) => data.password === data.confirmPassword && data.password !== "",
    {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    },
  );

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors, touchedFields },
  } = useForm<SignUpSchema>({
    mode: "all",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordLongEnough = (password ?? 0).length >= 8;

  const passwordsMatch = password === confirmPassword && password !== "";

  const hasSpecialCharsOrNumbers = (str: string) => {
    return /[^a-zA-Z\s]/.test(str);
  };

  const onSubmit = (data: SignUpSchema) => console.log(data);

  console.log(errors.password);

  return (
    <>
      <Helmet title="Cadastro" />
      <LinkComponent
        content="Já tem uma conta?"
        labelContent="Acessar conta"
        to="/sign-in"
      />

      <h1 className="text-content-body text-[24px] font-bold">Criar conta</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div>
          <label
            htmlFor="name"
            className="text-content-body text-md leading-5 font-semibold"
          >
            Nome
          </label>
          <Input
            className={twMerge(
              name && "text-content-body",
              errors.name &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            title="Nome"
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
        <div>
          <label
            htmlFor="email"
            className="text-content-body text-md leading-5 font-semibold"
          >
            E-mail
          </label>
          <Input
            className={twMerge(
              email && "text-content-body",
              errors.email &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            title="E-mail"
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
        <div>
          <label
            htmlFor="password"
            className="text-content-body text-md leading-5 font-semibold"
          >
            Senha
          </label>
          <Input
            className={twMerge(
              password && "text-content-body",
              errors.password &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            title="Senha"
            id="password"
            type="password"
            placeholder="Escolha uma senha segura"
            {...register("password")}
          />
          <Warning
            type="warning"
            content={(errors.password && errors.password?.message) ?? ""}
            done={!!errors.password}
            className="my-2 opacity-0"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-content-body text-md leading-5 font-semibold"
          >
            Repetir Senha
          </label>
          <Input
            className={twMerge(
              confirmPassword && "text-content-body",
              errors.confirmPassword &&
                "border-accent-red focus:border-accent-red hover:border-accent-red",
            )}
            title="Repetir a senha"
            id="confirmPassword"
            type="password"
            placeholder="Repita sua senha para continuar"
            {...register("confirmPassword")}
          />
        </div>

        <div
          className={twMerge(
            "mt-5 flex flex-col gap-[5px]",
            !touchedFields.password && "opacity-0",
          )}
        >
          <Warning
            type="error"
            content="Pelo menos 8 caracteres"
            done={isPasswordLongEnough}
          />
          <Warning
            type="error"
            content="Contém um número ou símbolo"
            done={hasSpecialCharsOrNumbers(password)}
          />
          <Warning
            type="error"
            content="As senhas devem ser iguais"
            done={passwordsMatch}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            content="Criar conta"
            type="submit"
            className="disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!isValid}
          />
        </div>
      </form>
    </>
  );
};

export default SignUp;
