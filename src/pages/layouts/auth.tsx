import { Outlet } from "react-router-dom";

import bg from "@/assets/bg.svg";
import logo from "@/assets/logo.svg";

const AuthLayout = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="bg-bg-p h-full w-4/5 overflow-hidden bg-cover">
        <img
          className="h-full w-full translate-x-[-100px] translate-y-[100px] scale-150 transform object-cover blur-md"
          src={bg}
        />
        <div className="absolute top-16 left-34 z-10 flex items-center gap-2">
          <img src={logo} alt="" />
          <h1 className="text-content-body text-[24px] font-extrabold">
            GUARD
          </h1>
        </div>
      </div>

      <div className="bg-bg-s flex w-2/5 flex-col gap-10 px-[88px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
