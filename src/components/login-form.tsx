import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Mail, LockKeyhole, ArrowRight } from "lucide-react";

import bgLogin from "@/assets/bg_login.png";
import logoSpot from "@/assets/logo_spot.png";
import React, { useState } from "react";

interface LoginFormProps extends React.ComponentPropsWithRef<"div"> {
  onSubmitForm: (data: { email: string; password: string }) => Promise<void>;
  isLoading: boolean;
  errorMsg?: string | null;
}

export function LoginForm({
  onSubmitForm,
  isLoading,
  errorMsg,
  className,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitForm({ email, password });
  };

  return (
    <div className={cn("w-full max-w-195", className)} {...props}>
      <Card className="w-full overflow-hidden rounded-[20px] border-0 bg-white p-0 shadow-lg">
        <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
          <div className="relative h-36 w-full overflow-hidden sm:h-44 md:h-full md:min-h-110">
            <img
              src={bgLogin}
              alt="Universitas Katolik Parahyangan"
              className="h-full w-full object-cover object-left"
            />
          </div>

          <form
            className="flex flex-col justify-center bg-[#F9FAFC] px-6 py-5 sm:px-8 sm:py-6 md:px-8 md:py-6"
            onSubmit={handleSubmit}
          >
            <FieldGroup className="mx-auto w-full max-w-[320px] gap-3 sm:gap-3.5">
              <div className="flex flex-col max-w-42.5 sm:max-w-47.5 gap-1">
                <img
                  src={logoSpot}
                  alt="SPOT"
                  className="w-full object-contain object-left"
                />

                <p className="text-[11px] sm:text-[11.5px] font-bold text-[#123456] leading-tight w-full">
                  Student Presentation and Organization Timing
                </p>
              </div>

              <div className="mt-1 sm:mt-1.5">
                <h1 className="text-2xl sm:text-[26px] font-bold leading-snug text-[#123456]">
                  Selamat Datang
                  <br />
                  di{" "}
                  <span className="text-[#F5C542] font-sans font-black">
                    SPOT
                  </span>
                </h1>
              </div>

              {errorMsg && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {errorMsg}
                </div>
              )}

              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-xs sm:text-sm font-bold text-[#123456]"
                >
                  Email
                </FieldLabel>

                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="h-9 sm:h-9.5 pl-9 text-xs"
                    required
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="text-xs sm:text-sm font-bold text-[#123456]"
                >
                  Kata Sandi
                </FieldLabel>

                <div className="relative">
                  <LockKeyhole
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-9 sm:h-9.5 pl-9 text-xs"
                    required
                  />
                </div>
              </Field>

              <Field className="mt-2 sm:mt-2.5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-9.5 sm:h-10 w-full bg-[#3060DF] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#244FC5]"
                >
                  {isLoading ? "Loading..." : "Masuk"}
                  <ArrowRight size={15} />
                </Button>
              </Field>

              <p className="text-center text-xs sm:text-[13px] font-bold text-[#123456]">
                Kendala login?{" "}
                <button
                  type="button"
                  className="font-bold text-[#F2B72D] hover:underline"
                >
                  Hubungi Admin
                </button>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
