import { CircleUserRound, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.svg";
import IconButton from "@/components/icon-button";

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-p flex h-screen w-screen">
      <aside className="flex h-full flex-col items-center justify-between py-12 pl-9">
        <img className="h-9 w-9" src={Logo} alt="" />
        <div className="space-y-3">
          <IconButton Icon={CircleUserRound} active />
          <IconButton
            Icon={LogOut}
            active={false}
            onClick={() => navigate("/sign-in")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-content-muted text-sm font-bold">
            Logado como:
          </span>
          <p className="text-content-body text-xs">yan312005@gmail.com</p>
        </div>
      </aside>
      <div className="bg-bg-s my-[70px] mr-[84px] ml-10 w-full rounded-[40px] p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
