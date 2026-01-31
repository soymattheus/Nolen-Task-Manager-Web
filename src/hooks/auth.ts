import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React from "react";

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signIn = async ({
    email,
    password,
  }: Omit<User, "name" | "created_at" | "status" | "tasks" | "status">) => {
    setIsLoading(true);
    const user: User = {
      name: "John Doe",
      created_at: new Date(),
      status: "active",
      email,
      password,
    };
    await setUser(user);
    router.replace("/dashboard");
  };

  const logout = () => {
    setUser(null);
  };

  // Authentication logic goes here
  return {
    user,
    signIn,
    logout,
    isLoading,
  };
}
