import { User } from "@/types/user";
import React from "react";
import { toast } from "sonner";

export default function useDashboard() {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    setIsError(false);
    const res = await fetch("/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setIsLoading(false);
      setIsError(true);
      toast.error(
        res.statusText ||
          "Erro ao carregar os dados do dashboard. Tente novamente.",
      );
      return;
    }

    const data = await res.json();
    setUser(data.user);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return {
    user,
    getData,
    isLoading,
    isError,
    isSuccess: !isLoading && !isError && user !== null,
  };
}
