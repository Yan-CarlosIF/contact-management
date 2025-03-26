import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Button from "../../components/button";
import Input from "../../components/input";

const SignIn = () => {
  return (
    <>
      <Helmet title="Login" />
      <span className="text-content-body mt-10 text-right text-sm text-nowrap">
        Não tem uma conta?{" "}
        <Link
          to="/sign-up"
          className="text-accent-brand hover:border-accent-brand border-b border-transparent transition duration-300 ease-in-out"
        >
          Criar conta
        </Link>
      </span>

      <div className="mt-42 flex flex-col gap-6">
        <h1 className="text-content-body text-[24px] font-bold">
          Acessar conta
        </h1>

        <form className="flex flex-col gap-6">
          <Input title="E-mail" placeholder="Seu e-mail aqui" />
          <Input title="Senha" placeholder="Seu e-mail aqui" />

          <div className="flex justify-end">
            <Button content="Acessar conta" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
