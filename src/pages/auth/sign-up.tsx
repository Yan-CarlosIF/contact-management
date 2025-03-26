import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Button from "../../components/button";
import Input from "../../components/input";
import Warning from "../../components/warning";

const SignUp = () => {
  return (
    <>
      <Helmet title="Cadastro" />
      <span className="text-content-body mt-10 text-right text-sm text-nowrap">
        Já tem uma conta?{" "}
        <Link
          to="/sign-in"
          className="text-accent-brand hover:border-accent-brand border-b border-transparent transition duration-300 ease-in-out"
        >
          Acessar Conta
        </Link>
      </span>

      <h1 className="text-content-body text-[24px] font-bold">Criar conta</h1>

      <form className="flex flex-col gap-6">
        <Input title="Nome" placeholder="Como você se chama?" />
        <Input title="E-mail" placeholder="Seu e-mail aqui" />
        <Input title="Senha" placeholder="Seu e-mail aqui" />
        <Input
          title="Repetir a senha"
          placeholder="Repita sua senha para continuar"
        />

        <div className="flex flex-col gap-[5px]">
          <Warning content="Pelo menos 8 caracteres" />
          <Warning content="Contém um número ou símbolo" />
          <Warning content="As senhas devem ser iguais" />
        </div>

        <div className="mt-22 flex justify-end">
          <Button content="Criar conta" />
        </div>
      </form>
    </>
  );
};

export default SignUp;
