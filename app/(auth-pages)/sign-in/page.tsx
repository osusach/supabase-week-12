"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/actions/auth";

export default function Login() {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      <div
        className={
          "container relative pt-20 flex flex-col justify-center items-center lg:px-0"
        }
      >
        <div className={"mx-auto flex flex-col w-full space-y-6 sm:w-[350px]"}>
          <div className={"flex flex-col items-center space-y-2 text-center"}>
            <Image
              alt={"ChileBecas logo"}
              height={100}
              src={"/logo.svg"}
              width={100}
            />
            <h1 className={"text-2xl font-semibold tracking-tight"}>
              Iniciar sesión
            </h1>
          </div>
          <p className={"text-center text-muted-foreground"}>Continúa con</p>
          <Button onClick={handleSignIn}>Google</Button>
        </div>
      </div>
    </>
  );
}
