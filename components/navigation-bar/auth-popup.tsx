"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { Button } from "@/components/ui/button";
import MaterialSymbolsAccountCircle from "@/components/icons/MaterialSymbolsAccountCircle";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import MdiGoogle from "@/components/icons/MdiGoogle";
import MdiGithub from "@/components/icons/MdiGithub";

function AuthPopup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const handleSocialLogin = (provider: string) => {
    setIsLoading((isLoading) => true);
    signIn(provider, { redirect: true, callbackUrl: "/" })
      .then((response) => {
        toast({
          title: "Just a moment...",
          description: `Redirect to ${provider}`,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Invalid credentials",
        });
      })
      .finally(() => {
        setIsLoading((isLoading) => false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <MaterialSymbolsAccountCircle className="w-8 h-8 text-gray-700 dark:text-gray-300" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>to continue using this app.</DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-2.5">
          <Button
            variant="outline"
            className="flex w-full bg-background text-foreground items-center focus-visible:ring-0"
            onClick={() => handleSocialLogin("github")}
            disabled={isLoading}
          >
            <MdiGithub className="mr-2 w-5 h-5" />
            Continue using github
          </Button>
          <Button
            variant="outline"
            className="flex w-full bg-background text-foreground focus-visible:ring-0"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          >
            <MdiGoogle className="mr-2 w-5 h-5" />
            Continue using google
          </Button>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default AuthPopup;
