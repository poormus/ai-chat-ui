"use client";
import RouteWrapper from "@/components/routewrapper";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { feidelogin, vippslogin } from "@/network/feide-login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VippsCallback() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    /// send request to server here
    if (code && state) {
      vippslogin(code, state)
        .then((user) => {})
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  return (
    <RouteWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <h6 className="text-2xl font-semibold text-center mb-4">
          {user ? `Welcome ${user.name}` : "Loading..."}
        </h6>
      </div>
    </RouteWrapper>
  );
}
