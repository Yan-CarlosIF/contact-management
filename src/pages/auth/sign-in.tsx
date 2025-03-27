import { Helmet } from "react-helmet-async";

import Button from "../../components/button";
import Input from "../../components/input";
import LinkComponent from "../../components/link";

const SignIn = () => {
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
