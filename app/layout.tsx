import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/firstPage/Header"; // Import the Header component
import Footer from "./components/firstPage/Footer"; // Import the Footer component
import { AuthProvider } from "./contexts/AuthContext"; // Import the AuthProvider

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
          <Header /> {/* Include the Header component */}
          {children}
          <Footer /> {/* Include the Footer component */}
        </AuthProvider>
      </body>
    </html>
  );
}
