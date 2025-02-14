"use client";

// Import necessary components
import MapView from "../../../components/Login-Register/MapView";
import ContinueRegisterForm from "../../../components/Login-Register/FilterSidebar";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Hide the footer
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = "none";
    }

    // Show the footer when the component is unmounted
    return () => {
      if (footer) {
        footer.style.display = "";
      }
    };
  }, []);

  return <MapView />;
}
