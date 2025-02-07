"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, User, Settings } from "lucide-react";

export default function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r bg-gradient-to-br from-gray-800 to-blue-600 mx-auto flex items-center justify-center">
          <User className="h-12 w-12 text-white" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.name}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 ease-in-out flex items-center justify-center">
          <Settings className="mr-2 h-4 w-4" /> Inställningar
        </Button>

        <Button
          onClick={logout}
          className="w-full bg-gradient-to-br from-gray-800 to-blue-600 text-white transition-all duration-300 ease-in-out flex items-center justify-center hover:from-blue-600 hover:to-gray-800"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logga ut
        </Button>
      </div>
    </motion.div>
  );
}
