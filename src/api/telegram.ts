const { TOKEN, CHAT_ID } = process.env;
const bsaeUrl = `https://api-telegram.org/${TOKEN}/`;

export const sendmessage = async (message: string): Promise<void> => {
  const url: string = `${bsaeUrl}sendMessage?chat_id=${CHAT_ID}&text=${message}`;

  const response: Response = await fetch(url);

  console.log("response", response);
};
