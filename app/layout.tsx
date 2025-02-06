import type { Metadata } from "next";
import "./globals.css"; // Import globals.css here
import Header from "./components/FirstPage/Header"; // Import the Header component
import Footer from "./components/FirstPage/Footer"; // Import the Footer component
import { AuthProvider } from "./contexts/AuthContext"; // Correct import path for AuthProvider

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
          {/* Include the VerificationMessage component */}
          {children}
          <Footer /> {/* Include the Footer component */}
        </AuthProvider>
      </body>
    </html>
  );
}
