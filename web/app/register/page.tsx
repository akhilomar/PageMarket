import { AuthForm } from "@/components/forms/auth-form";

export default function RegisterPage() {
  return (
    <main className="container-shell py-12">
      <AuthForm mode="register" />
    </main>
  );
}

