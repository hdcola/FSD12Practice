import config from "../../../postcss.config.mjs";

const configure = {
  APIURL: "http://localhost:11434/v1/chat/completions",
  APIKEY: "YOUR_API_KEY",
  MODEL: "llama3:8b",
};

export const translate = async (text) => {
  const messages = [
    {
      role: "system",
      content:
        "你是一位中文翻译，请将我所说的话翻译成中文，请直接回复翻译结果，不要包括任何解释。",
    },
    { role: "user", content: text },
  ];
  console.log(messages);
  const result = await completion(messages);
  console.log(result);
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
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
