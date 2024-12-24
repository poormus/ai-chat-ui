"use client";
import RouteWrapper from "@/components/routewrapper";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { feidelogin } from "@/network/feide-login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FeideCallback() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    /// send request to server here
    if (code && state) {
      feidelogin(code, state)
        .then((user) => {
          setUser(user);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  const handleLogout = () => {
    /// burada bizim kendi logoutumuz calistiktan sonra feide logoutu yapmamiz gerekiyor
    const idToken = user?.feideIdToken;
    const logoutUrl = `https://auth.dataporten.no/openid/endsession?post_logout_redirect_uri=https://localhost:3000/&id_token_hint=${idToken}`;
    window.location.href = logoutUrl;
    ///
  };

  return (
    <RouteWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <h6 className="text-2xl font-semibold text-center mb-4">
          {user ? `Welcome ${user.name}` : "Loading..."}
        </h6>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </RouteWrapper>
  );
}
