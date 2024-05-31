"use client";
import { register } from "@tauri-apps/api/globalShortcut";
import { readText } from "@tauri-apps/api/clipboard";
import { useEffect, useState } from "react";
import StickyBanner from "./components/StickyBanner";
import ContentBox from "./components/ContentBox";
import { translate } from "./utils/AiService";

export default function Home() {
  const [clipboardText, setClipboardText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const readClipboard = async () => {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    const text = await readText();
    setClipboardText(text);
    await appWindow.show();
  };

  useEffect(() => {
    const handleShortcutWithImport = async () => {
      if (typeof window !== "undefined") {
        await register("Command+Shift+T", () => {
          readClipboard();
        });
      }
    };

    handleShortcutWithImport();
  }, []);

  const handleTranslate = async () => {
    const result = await translate(clipboardText);
    setTranslatedText(result);
  };

  const switchAndTranslate = async () => {
    setClipboardText(translatedText);
    const result = await translate(translatedText);
    setTranslatedText(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <StickyBanner />
      <div className="flex w-full flex-1">
        <ContentBox
          content={clipboardText}
          handleChange={(envent) => {
            setClipboardText(envent.target.value);
          }}
          handleTranslate={handleTranslate}
        />
        <ContentBox
          content={translatedText}
          handleChange={(envent) => {
            setTranslatedText(envent.target.value);
          }}
          handleTranslate={switchAndTranslate}
        />
      </div>
    </main>
  );
}
