import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { Mail, LockKeyhole, ArrowRight } from "lucide-react"

import bgLogin from "@/assets/bg_login.png"
import logoSpot from "@/assets/logo_spot.png"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden rounded-[22px] border-0 bg-white p-0 shadow-lg">

        <CardContent className="grid min-h-[445px] grid-cols-1 p-0 md:grid-cols-2">

          <div className="relative min-h-[250px] overflow-hidden md:min-h-[445px]">

            <img 
            src={bgLogin} 
            alt="Universitas Katolik Parahyangan" 
            className="inset-0 h-full w-full object-cover object-left"/>
          </div>

          <form className="flex flex-col justify-center bg-[#F9FAFC] px-10 py-6 md:px-10"
          onSubmit={(e) => e.preventDefault()}
          >
            <FieldGroup className="pl-4 gap-4 w-[370px]">
              <div className="flex flex-col max-w-[300px] gap-1.5">
                <img 
                src={logoSpot} 
                alt="SPOT" 
                className="w-full object-contain object-left"/>

                <p className="text-[12.5px] font-bold text-[#123456]">
                  Student Presentation and Organization Timing
                </p>
              </div>

              <div className="mt-4">
                <h1 className="text-[35px] font-bold leading-tight text-[#123456]">
                  Selamat Datang
                  <br />
                  di <span className="text-[#F5C542] font-sans font-[900]">SPOT</span>
                </h1>
              </div>

              <Field>
                <FieldLabel 
                htmlFor="email" 
                className="font-bold text-[#123456]"
                >
                  Email
                  </FieldLabel>
                
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                  <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email Anda"
                  className="h-10 pl-9 text-xs"
                  required
                />
                </div>
              </Field>
              
              <Field>
                <FieldLabel htmlFor="password" className="font-bold text-[#123456]">
                  Kata Sandi
                </FieldLabel>

                <div className="relative">
                  <LockKeyhole size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                  <Input 
                  id="password" 
                  type="password" 
                  placeholder="Masukkan Password Anda"
                  className="h-10 pl-9 text-xs"
                  required />
                </div>
              </Field>

              <Field className="mt-5">
                <Button 
                type="submit"
                className="h-11 w-full bg-[#3060DF] font-bold tracking-wide hover:bg-[#244FC5]">
                  Masuk
                  <ArrowRight size={16}/>
                  </Button>
              </Field>

              <p className="text-center text-[14px] font-bold text-[#123456]">
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
  )
}
