import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getUser } from "@/api/get-user";
import bg from "@/assets/bg.svg";
import logo from "@/assets/logo.svg";

const AuthLayout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: false,
  });

  useEffect(() => {
    if (!user) {
      queryClient.fetchQuery({ queryKey: ["user"], queryFn: getUser });
    }
  }, [user, queryClient]);

  if (user) {
    navigate("/home");
  }

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
            YAN
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
