import RegisterForm from "../../components/RegisterForm";
import { AuthProvider } from "../../contexts/AuthContext";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
}
