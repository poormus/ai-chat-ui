// Purpose: Interface for message model with an ai.
interface Message {
  id: number | string;
  content: string;
  role: "user" | "assistant";
}
