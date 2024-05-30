import config from "../../../postcss.config.mjs";

const configure = {
  APIURL: "http://localhost:11434/v1/chat/completions",
  APIKEY: "YOUR_API_KEY",
  MODEL: "gemma:7b",
};

export const translate = async (text) => {
  const messages = [
    {
      role: "system",
      content: "你是一位中文翻译，请将我所说的话翻译成中文。以下是我的输入",
    },
    { role: "user", content: text },
  ];
  const result = await completion(messages);
  return result;
};

export const completion = async (messages) => {
  return await fetch(configure.APIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${configure.APIKEY}`,
    },
    body: JSON.stringify({
      messages: messages,
      model: configure.MODEL,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
