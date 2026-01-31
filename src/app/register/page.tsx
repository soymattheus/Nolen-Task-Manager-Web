"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Eye, EyeOff, ListCheck } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/auth";
import { Spinner } from "@/components/ui/spinner";

const registerSchema = z
  .object({
    email: z.email("Insira um e-mail válido."),
    password: z.string("Insira a sua senha.").min(6, {
      message: "O campo senha deve ter ao menos 6 caracteres.",
    }),
    confirmPassword: z.string("Confirme a sua senha.").min(6, {
      message: "Confirme a sua senha.",
    }),
    name: z
      .string("Insira um nome válido.")
      .min(1, "Nome é obrigatório.")
      .regex(/^[a-z A-Z]+$/, {
        message: "O campo deve conter apenas letras.",
      })
      .trim(),
    last_name: z
      .string("Insira um sobrenome válido.")
      .min(1, "Sobrenome é obrigatório.")
      .regex(/^[a-z A-Z]+$/, {
        message: "O campo deve conter apenas letras.",
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem.",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const { isLoading, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const [showPwd, setShowPwd] = React.useState<boolean>(false);
  const [showConfirmPwd, setShowConfirmPwd] = React.useState<boolean>(false);

  async function onRegister({
    email,
    password,
    name,
    last_name,
  }: RegisterSchema) {
    signUp({
      email,
      password,
      name,
      last_name,
    });
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-between bg-white font-sans">
      <header className="flex flex-row w-full py-4 px-6 border-b border-gray-300 justify-between items-center">
        <div className="flex flex-row gap-2 p-1.5 rounded-md border border-gray-300">
          <ListCheck />
          Task Manager
        </div>
        <Button onClick={() => router.push("/")}>Entrar</Button>
      </header>

      <main className="flex flex-col w-full md:w-2/6 gap-4 py-4 justify-center items-center my-auto">
        <p className="text-3xl font-bold">Criar sua conta</p>
        <form
          className="flex flex-col w-4/5 md:w-full border border-gray-300 gap-3 p-7 rounded-md"
          onSubmit={handleSubmit(onRegister)}
        >
          {/* E-mail */}
          <Field data-invalid={errors.email}>
            <FieldLabel htmlFor="fieldgroup-email">E-mail</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="text"
              placeholder="nome@exemplo.com"
              {...register("email")}
            />
            <FieldError>{errors?.email?.message}</FieldError>
          </Field>

          {/* Password */}
          <Field data-invalid={errors.password}>
            <FieldLabel htmlFor="input-button-password">Senha</FieldLabel>
            <ButtonGroup className="flex flex-1 w-full h-full outline-0 data-[disabled=true]:bg-[#F0F0F0]">
              <Input
                type={showPwd ? "text" : "password"}
                id="input-button-password"
                placeholder="Senha"
                autoComplete="off"
                {...register("password")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <Eye /> : <EyeOff />}
              </Button>
            </ButtonGroup>
            <FieldError>{errors?.password?.message}</FieldError>
          </Field>

          {/* Confirm Password */}
          <Field data-invalid={errors.password}>
            <FieldLabel htmlFor="input-button-confirm-password">
              Confirme sua Senha
            </FieldLabel>
            <ButtonGroup className="flex flex-1 w-full h-full outline-0 data-[disabled=true]:bg-[#F0F0F0]">
              <Input
                type={showConfirmPwd ? "text" : "password"}
                id="input-button-confirm-password"
                placeholder="Confirme sua senha"
                autoComplete="off"
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              >
                {showConfirmPwd ? <Eye /> : <EyeOff />}
              </Button>
            </ButtonGroup>
            <FieldError>{errors?.confirmPassword?.message}</FieldError>
          </Field>

          <hr className="border-gray-300" />

          {/* Name */}
          <Field data-invalid={errors.name}>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input
              id="fieldgroup-name"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="off"
              {...register("name")}
            />
            <FieldError>{errors?.name?.message}</FieldError>
          </Field>

          {/* Last Name */}
          <Field data-invalid={errors.last_name}>
            <FieldLabel htmlFor="fieldgroup-name">Sobrenome</FieldLabel>
            <Input
              id="fieldgroup-last-name"
              type="text"
              placeholder="Digite seu sobrenome"
              autoComplete="off"
              {...register("last_name")}
            />
            <FieldError>{errors?.last_name?.message}</FieldError>
          </Field>

          <Button disabled={isLoading} type="submit">
            {isLoading && <Spinner />}
            Cadastrar
          </Button>

          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            <p className="font-normal text-[14px]">Você já tem uma conta?</p>
            <Link
              href="/"
              className="font-bold text-[14px] underline cursor-pointer"
            >
              Entrar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
