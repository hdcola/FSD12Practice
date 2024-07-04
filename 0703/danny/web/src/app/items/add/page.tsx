"use client";
import { ItemType } from "@/app/lib/data/definitions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addItem, State } from "@/app/lib/data/item";

export default function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      const item = await addItem(formData);
      router.push(`/items`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="rounded-md bg-gray-50 p-4 md:p-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name" className="label label-text">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="input input-bordered flex items-center"
            type="text"
            placeholder="Enter name of item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="label label-text">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="input input-bordered flex items-center"
            type="text"
            placeholder="Enter description of item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price" className="label label-text">
            Price
          </label>
          <input
            id="price"
            name="price"
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
