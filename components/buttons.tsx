"use client";

import { LogOutIcon } from "lucide-react";

import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";

function SignOutButton() {
  const handleClick = async () => {
    await signOut();
  };

  return (
    <Button onClick={handleClick} variant={"link"}>
      <LogOutIcon className={"h-5 w-5 mr-2"} />
      Cerrar sesión
    </Button>
  );
}

export { SignOutButton };
