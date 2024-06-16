import { TOKEN, CHAT_ID } from "../values";

const bsaeUrl = `https://api.telegram.org/bot${TOKEN}/`;

export const sendmessage = async (message: string): Promise<void> => {
  const url: string = `${bsaeUrl}sendMessage?chat_id=${CHAT_ID}&text=${message}`;

  const response: Response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    await Promise.reject(error.description || "Something went wrong!");
  }

  console.log("response", response);
};
