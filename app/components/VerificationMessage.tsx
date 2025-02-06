"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth"; // Correct import path for useAuth

const VerificationMessage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // No user is logged in
  }

  return (
    <div>
      {user.verified ? (
        <p>Your account is verified.</p>
      ) : (
        <p>Please verify your account.</p>
      )}
    </div>
  );
};

export default VerificationMessage;
