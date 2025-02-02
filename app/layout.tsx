import type { Metadata } from "next";
import "./globals.css"; // Import globals.css here
import Header from "./components/firstPage/Header"; // Import the Header component
import Footer from "./components/firstPage/Footer"; // Import the Footer component
import { AuthProvider } from "./components/AuthProvider"; // Correct import path for AuthProvider
import LoginSlider from "./components/firstPage/LoginSlider"; // Import the LoginSlider component

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Ensure AuthProvider wraps all components */}
          <Header /> {/* Include the Header component */}
          <LoginSlider />
          {children}
          <Footer /> {/* Include the Footer component */}
        </AuthProvider>
      </body>
    </html>
  );
}
