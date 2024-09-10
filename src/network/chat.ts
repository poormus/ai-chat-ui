/**
 * send message object to backend local host 8000/v1/ai/summarize
 * @param message
 *
 */
type Callback = (result: string) => void;
export async function sendMessage(message: string, callback: Callback) {
  const response = await fetch("http://localhost:8000/v1/ai/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();
  while (true) {
    const { done, value } = await reader!.read();
    if (done) {
      break;
    }
    callback(value);
  }
}
