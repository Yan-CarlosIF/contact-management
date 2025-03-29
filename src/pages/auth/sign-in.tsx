import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import z from "zod";

import { login } from "@/api/login";

import Button from "../../components/button";
import Input from "../../components/input";
import LinkComponent from "../../components/link";
import Warning from "../../components/warning";

const signInSchema = z.object({
  email: z.string().email("O e-mail é obrigatorio").nonempty(),
  password: z.string().nonempty("A senha é obrigatoria"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm<SignInSchema>({
    mode: "all",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  const { mutateAsync: loginFn, isPending: isLoginPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logado com sucesso!", {
        closeButton: true,
      });
      navigate("/home");
    },
    onError: () =>
      toast.error("Erro ao logar, Email ou senha incorretos", {
        closeButton: true,
      }),
  });

  return (
    <>
      <Helmet title="Login" />
      <LinkComponent
        content="Não tem uma conta?"
        labelContent="Criar conta"
        to="/sign-up"
      />

      <div className="mt-42 flex flex-col gap-6">
        <h1 className="text-content-body text-[24px] font-bold">
          Acessar conta
        </h1>

        <form
          onSubmit={handleSubmit(() => loginFn({ email, password }))}
          className="flex flex-col"
        >
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
              id="email"
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
              id="password"
              type="password"
              placeholder="Insira sua senha"
              {...register("password")}
            />
            <Warning
              type="warning"
              content={(errors.password && errors.password?.message) ?? ""}
              done={!!errors.password}
              className="my-2 opacity-0"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              content="Acessar conta"
              disabled={!isValid || isLoginPending}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
