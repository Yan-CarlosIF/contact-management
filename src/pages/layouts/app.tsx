import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleUserRound, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getUser } from "@/api/get-user";
import { logout } from "@/api/logout";
import Logo from "@/assets/logo.svg";
import IconButton from "@/components/icon-button";
import { Skeleton } from "@/components/ui/skeleton";

const AppLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isPending: isPendingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const handleLogout = async () => {
    await logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/sign-in");
    queryClient.clear();
  };

  return (
    <div className="bg-bg-p flex h-screen w-screen">
      <aside className="flex h-full flex-col items-center justify-between py-12 pl-9">
        <img className="h-9 w-9" src={Logo} alt="" />
        <div className="space-y-3">
          <IconButton Icon={CircleUserRound} active />
          <IconButton Icon={LogOut} active={false} onClick={handleLogout} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-content-muted text-sm font-bold">
            Logado como:
            {!isPendingUser && user ? (
              <p className="text-content-p font-semibold">{user.email}</p>
            ) : (
              <Skeleton className="bg-muted-foreground h-3 w-40 animate-pulse" />
            )}
          </span>
        </div>
      </aside>
      <div className="bg-bg-s my-[70px] mr-[84px] ml-10 w-full rounded-[40px] p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
