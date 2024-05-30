"use client";
import { register } from "@tauri-apps/api/globalShortcut";
import { readText } from "@tauri-apps/api/clipboard";
import { useEffect, useState } from "react";

export default function Home() {
  const [clipboardText, setClipboardText] = useState("");

  const readClipboard = async () => {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    const text = await readText();
    setClipboardText(text);
    await appWindow.show();
  };

  useEffect(() => {
    const handleShortcutWithImport = async () => {
      if (typeof window !== "undefined") {
        await register("Command+D", () => {
          readClipboard();
        });
      }
    };

    handleShortcutWithImport();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello, Tailwind!</h1>
      <p className="text-lg text-gray-700">
        This is a Tailwind CSS page with Tauri API integration.
      </p>
      <div className="bg-gray-200 p-4 rounded-lg">
        <p className="text-lg font-bold">Clipboard Text:</p>
        <p className="text-lg">{clipboardText}</p>
      </div>
    </main>
  );
}
