import { User } from "@/models/user";

export async function feidelogin(code: string, state: string): Promise<User> {
  const response = await fetch(
    "http://localhost:8000/v1/auth/feide/login-oidc/callback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, state: state }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  const { user, tokens } = data.data;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    feideIdToken: user.feideIdToken,
  };
}
