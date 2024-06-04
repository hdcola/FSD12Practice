"use client";
// pages/translate.tsx
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

const TranslatePage: NextPage = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");

  const handleTranslate = async () => {
    const payload = {
      q: sourceText,
      source: "auto",
      target: "zh",
      format: "text",
    };

    console.log("Sending payload:", payload); // Debug: Log the payload

    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Received response:", response); // Debug: Log the response

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Translation data:", data); // Debug: Log the translation data

      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      setTranslatedText("Translation error.");
    }
  };

  return (
    <>
      <Head>
        <title>Allen translator</title>
      </Head>
      <div className="bg-gray-100 p-6 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">
            Translate Text to Chinese
          </h1>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows={10}
            placeholder="Enter text..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
            placeholder="Translation"
            value={translatedText}
            readOnly
          />
          <button
            onClick={handleTranslate}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Translate
          </button>
        </div>
      </div>
    </>
  );
};

export default TranslatePage;
