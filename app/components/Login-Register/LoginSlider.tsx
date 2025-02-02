"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm"; // Correct import path for LoginForm
import UserProfile from "./UserProfile"; // Correct import path for UserProfile
import { useAuth } from "../../hooks/useAuth"; // Correct import path for useAuth

export default function LoginSlider() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
    }
  }, [isLoggedIn]);

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
                    <div className="flex justify-between items-center p-6  bg-gradient-to-br from-gray-400 to-purple-600 text-white">
                      <Dialog.Title className="text-2xl font-bold">
                        {isLoggedIn ? "Your Profile" : "Välkommen!"}
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </Dialog.Close>
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto">
                      {isLoggedIn ? <UserProfile /> : <LoginForm />}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
