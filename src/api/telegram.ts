const bsaeUrl =
  "https://api-telegram.org/7204645093:AAFDqpHs6Tt6Behk0mOLPhcA9sX9hSOmLCI/";

export const sendmessage = async (message: string): Promise<void> => {
  const url: string = `${bsaeUrl}sendMessage?chat_id=-1002169910631&text=${message}`;

  const response: Response = await fetch(url);

  console.log("response", response);
};
