import { AuthForm } from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <main className="container-shell py-12">
      <AuthForm mode="login" />
    </main>
  );
}

