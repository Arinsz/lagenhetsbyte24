import RegisterForm from "../../components/RegisterForm";
import { AuthProvider } from "../../contexts/AuthContext";
import Header from "../../components/firstPage/Header";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <Header />
      <RegisterForm />
    </AuthProvider>
  );
}
