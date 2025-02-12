"use client";

import { useState } from "react";
import { useRegister } from "../../hooks/RegisterFormHook";
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix UI Dialog
import { useForm } from "react-hook-form"; // Import react-hook-form
import type React from "react"; // Added import for React
import { CheckCircle, AlertCircle } from "lucide-react"; // Import CheckCircle and AlertCircle icons
import { Button } from "@/components/ui/button"; // Import Button component
import GoogleIcon from "../../../public/icons/GoogleIcon"; // Import GoogleIcon component

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    register: registerUser,
    error,
    isDialogOpen,
    setIsDialogOpen,
    isSuccessDialogOpen,
    setIsSuccessDialogOpen
  } = useRegister();

  const onSubmit = (data: any) => {
    registerUser(data.email, data.password, data.confirmPassword);
  };

  const handleGoogleLogin = () => {
    // Add logic for Google login
    console.log("Google login");
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: "url('/registration.jpg')"
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Välkommen!</p>
          {error && (
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Dialog.Trigger asChild>
                <button className="hidden">Open Dialog</button>
              </Dialog.Trigger>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed top-[calc(50%-2cm)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
                <div className="flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                  <Dialog.Title className="text-2xl font-bold text-gray-800">
                    Fel
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-center text-gray-600">
                    {error}
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <Button
                      onClick={() => setIsDialogOpen(false)}
                      className="mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500 focus:outline-none"
                    >
                      Stäng
                    </Button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          )}
          {errors.email && (
            <Dialog.Root open={true} onOpenChange={() => {}}>
              <Dialog.Trigger asChild>
                <button className="hidden">Open Email Error Dialog</button>
              </Dialog.Trigger>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed top-[calc(50%-2cm)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
                <div className="flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                  <Dialog.Title className="text-2xl font-bold text-gray-800">
                    Fel
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-center text-gray-600">
                    {typeof errors.email?.message === "string" &&
                      errors.email.message}
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <Button
                      onClick={() => {}}
                      className="mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500 focus:outline-none"
                    >
                      Stäng
                    </Button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          )}
          <Dialog.Root
            open={isSuccessDialogOpen}
            onOpenChange={setIsSuccessDialogOpen}
          >
            <Dialog.Trigger asChild>
              <button className="hidden">Open Success Dialog</button>
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-[calc(50%-2cm)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <Dialog.Title className="text-2xl font-bold text-gray-800">
                  Registrering lyckades
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-center text-gray-600">
                  Vänligen kontrollera din e-post för verifiering.
                </Dialog.Description>
                <Dialog.Close asChild>
                  <Button
                    onClick={() => setIsSuccessDialogOpen(false)}
                    className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 focus:outline-none"
                  >
                    Stäng
                  </Button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Root>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-postadress
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                {...register("email", {
                  required: "E-postadress är obligatorisk"
                })}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Lösenord
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                {...register("password", {
                  required: "Lösenord är obligatoriskt"
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {typeof errors.password.message === "string" &&
                    errors.password.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bekräfta lösenord
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                {...register("confirmPassword", {
                  required: "Bekräfta lösenord är obligatoriskt"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {typeof errors.confirmPassword.message === "string" &&
                    errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mt-8">
              <Button
                className="bg-primary text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Registrera
              </Button>
            </div>
          </form>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Registrera dig med Google
            </h1>
          </a>
          <div className="mt-4 flex items-center justify-between"></div>
        </div>
      </div>
    </div>
  );
}
