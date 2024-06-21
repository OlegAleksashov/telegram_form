import axios from "axios";
import { TOKEN, CHAT_ID } from "../values";

const bsaeUrl = `https://api.telegram.org/bot${TOKEN}/`;

/*This is currently an unnecessary feature.*/
export const sendMessage = async (message: string): Promise<void> => {
  const url: string = `${bsaeUrl}sendMessage?chat_id=${CHAT_ID}&text=${message}`;
  try {
    const response: Response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      await Promise.reject(error.description || "Something went wrong!");
    }
    console.log("Message sent successfully", response);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const sendPhoto = async (
  file: string,
  caption: string
): Promise<void> => {
  const url = `${bsaeUrl}sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("photo", file);
  formData.append("caption", caption);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Photo uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};
