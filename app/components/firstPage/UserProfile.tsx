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
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto flex items-center justify-center">
          <User className="h-12 w-12 text-white" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.name}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 ease-in-out flex items-center justify-center">
          <Settings className="mr-2 h-4 w-4" /> Account Settings
        </Button>

        <Button
          onClick={logout}
          className="w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out flex items-center justify-center"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </motion.div>
  );
}
