"use client";
import RouteWrapper from "@/components/routewrapper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Home() {
  // handle navigation using nextjs router
  const router = useRouter();
  function handleNavigation(v: string) {
    router.push(`/${v}`);
  }
  return (
    <RouteWrapper>
      {/*
       *center select at the center
       */}
      <div className="flex flex-col items-center justify-center h-full">
        {/*
         * create a h6 text
         */}
        <h6 className="text-2xl font-semibold text-center mb-4">
          Select an ai template
        </h6>
        <Select onValueChange={(v) => handleNavigation(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ai template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summary">Summary</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
          </SelectContent>
        </Select>
        <h6 className="text-2xl font-semibold text-center mb-4 pt-40">
          Login with feide
        </h6>
        {/*
         * student role
         */}

        <h6 className="text-2xl font-semibold text-center mb-4 pt-4">
          elev_no856326499_1a_1 ---  098asd
        </h6>

        <h6 className="text-2xl font-semibold text-center mb-4 pt-4 ">
          bjorg_laererg ---  098asd
        </h6>
        <Button>
          <a href="http://localhost:8000/v1/auth/feide/login-oidc">
            Login with feide
          </a>
        </Button>

        <h6 className="text-2xl font-semibold text-center mb-4 pt-4">
          47223796
        </h6>
        <Button className="mt-4">
          <a href="http://localhost:8000/v1/auth/vipps/login-oidc">
            Vipps login
          </a>
        </Button>
      </div>
    </RouteWrapper>
  );
}
