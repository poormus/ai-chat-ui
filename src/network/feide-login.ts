import { User } from "@/models/user";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzExNDc5NTMxZmU4ZWIxNzdlNTdjYjUiLCJpYXQiOjE3MzY5NTQ5NDksImV4cCI6MTczODc1NDk0OSwidHlwZSI6ImFjY2VzcyJ9.oC9BPISHFr2sW7dpFIAypa4JBqqTjdBrwMjGhqXpm9I";
export async function feidelogin(code: string, state: string): Promise<User> {
  const response = await fetch(
    "http://localhost:8000/v1/auth/feide/login-oidc/callback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
    feideIdToken: "",
  };
}

export async function vippslogin(code: string, state: string): Promise<void> {
  const response = await fetch(
    "http://localhost:8000/v1/auth/vipps/login-oidc/callback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ code: code, state: state }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  console.log(data);
}
