"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm"; // Correct import path for LoginForm
import UserProfile from "./UserProfile"; // Correct import path for UserProfile
import { useAuth } from "../../hooks/useAuth"; // Correct import path for useAuth
import { useSearchParams, useRouter } from "next/navigation"; // Import useSearchParams and useRouter

export default function LoginSlider() {
  const [open, setOpen] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isLoggedIn, user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (searchParams && searchParams.get("verified")) {
      setOpen(true);
      setShowVerificationDialog(true);
      // Remove the query parameter from the URL
      router.replace(window.location.pathname, undefined);
    }
  }, [searchParams, router]);

  const handleLoginError = (message: string) => {
    setErrorMessage(message);
    setErrorDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-white text-black font-medium rounded-md px-6 py-2 duration-300 hover:bg-white hover:underline text-base"
      >
        {isLoggedIn ? (
          <>
            <User className="mr-2 h-4 w-4" /> {user?.email}
          </>
        ) : (
          "Logga in"
        )}
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-black/50 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  className="fixed top-0 right-0 h-full w-[400px] bg-white text-black shadow-2xl z-50 overflow-hidden"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center p-6  bg-gradient-to-br from-gray-800 to-blue-600 text-white">
                      <Dialog.Title className="text-2xl font-bold">
                        {isLoggedIn ? "Din Profil" : "Välkommen!"}
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20 focus:outline-none"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </Dialog.Close>
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto">
                      {isLoggedIn ? (
                        <UserProfile />
                      ) : (
                        <LoginForm onError={handleLoginError} />
                      )}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
      <Dialog.Root
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-[calc(50%-2cm)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <Dialog.Title className="text-2xl font-bold text-gray-800">
                E-post verifierad
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-center text-gray-600">
                Din e-post har verifierats. Du kan nu logga in.
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button
                  onClick={() => setShowVerificationDialog(false)}
                  className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 focus:outline-none"
                >
                  Stäng
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-[calc(50%-2cm)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <Dialog.Title className="text-2xl font-bold text-gray-800">
                Inloggning misslyckades
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-center text-gray-600">
                {errorMessage}
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button
                  onClick={() => setErrorDialogOpen(false)}
                  className="mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500 focus:outline-none"
                >
                  Stäng
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
