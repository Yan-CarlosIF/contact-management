import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";

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
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignInSchema>({
    mode: "all",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = register("email");
  const password = register("password");

  const onSubmit = (data: SignInSchema) => console.log(data);

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
            <Button type="submit" content="Acessar conta" disabled={!isValid} />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
