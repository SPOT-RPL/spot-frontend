import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { setCookie } from "@/lib/cookies";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal melakukan Login");
      }

      if (data.accessToken) {
        setCookie("accessToken", data.accessToken, 15);
      }
      if (data.refreshToken) {
        setCookie("refreshToken", data.refreshToken, 24 * 60);
      } 

      navigate("/mahasiswa");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen min-h-dvh items-center justify-center bg-[#F2F4F7] p-4 sm:p-6">
      <LoginForm
        onSubmitForm={handleLogin}
        isLoading={isLoading}
        errorMsg={error}
      />
    </div>
  );
}
