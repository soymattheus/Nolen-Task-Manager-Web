import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signUp = async (
    payload: Omit<User, "created_at" | "status" | "tasks">,
  ) => {
    setIsLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setIsLoading(false);
      toast.error(res.statusText || "Erro ao criar a conta. Tente novamente.");
      return;
    }

    router.replace("/");
  };

  const signIn = async ({
    email,
    password,
  }: Omit<
    User,
    "name" | "last_name" | "created_at" | "status" | "tasks" | "status"
  >) => {
    setIsLoading(true);

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setIsLoading(false);
      toast.error(res.statusText || "Erro ao entrar. Tente novamente.");
      return;
    }

    const data = await res.json();
    setUser(data.user);

    router.replace("/dashboard");
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
    isLoading,
  };
}
