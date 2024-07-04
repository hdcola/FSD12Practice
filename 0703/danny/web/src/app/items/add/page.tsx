"use client";
import { ItemType } from "@/app/lib/data/definitions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const addItem = async (item: ItemType): Promise<ItemType> => {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to add item");
    }
    return await response.json();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const item: ItemType = {
      id: 0,
      name: name,
      description: description,
      price: Number(price),
    };
    router.push("");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label className="label label-text">Name</label>
          <input
            className="input input-bordered flex items-center"
            type="text"
            placeholder="Enter name of item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="label label-text">Description</label>
          <input
            className="input input-bordered flex items-center"
            type="text"
            placeholder="Enter description of item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="label label-text">Price</label>
          <input
            className="input input-bordered flex items-center"
            type="number"
            placeholder="Enter price of item"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </main>
  );
}
