"use client";
import RouteWrapper from "@/components/routewrapper";
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
      </div>
    </RouteWrapper>
  );
}
