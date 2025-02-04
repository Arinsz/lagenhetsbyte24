import RegisterForm from "../../components/Login-Register/RegisterForm";
import { AuthProvider } from "../../contexts/AuthContext";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
}
