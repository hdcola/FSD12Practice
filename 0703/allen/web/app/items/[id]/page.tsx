"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Item, fetchItems } from "@/app/lib/actions";

export default function Page({ params }: { params: { id: number } }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        const currentItem = fetchedItems.find(
          (item) => item.id === Number(params.id)
        );
        if (currentItem) {
          setItem(currentItem);
          setName(currentItem.name);
          setDescription(currentItem.description);
          setPrice(String(currentItem.price));
        } else {
          console.error("Item not found");
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    getItems();
  }, [params.id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://100.89.152.5:8080/api/items/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description, price }),
        }
      );
      if (response.ok) {
        console.log("success");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!item) {
    return (
      <main className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-success"></span>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 h-128 shadow-xl">
        <figure>
          <img
            src={
              item.image_url
                ? `http://100.89.152.5:8080${item.image_url}`
                : "/sample.webp"
            }
            alt="item image"
          />
        </figure>
        <div className="card-body">
          <input
            id="name"
            name="name"
            className="input input-bordered flex items-center"
            type="text"
            placeholder={`The name of the item was: ( ${item.name} )`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id="description"
            name="description"
            className="input input-bordered flex items-center"
            type="text"
            placeholder={`The description of the item was: ( ${item.description} )`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            id="price"
            name="price"
            className="input input-bordered flex items-center"
            type="text"
            placeholder={`The price of the item was: ( ${item.price} )`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="card-actions justify-end">
            <Link
              type="button"
              className="btn btn-primary"
              href="/"
              onClick={handleSubmit}
            >
              Submit
            </Link>
            <Link type="button" className="btn btn-neutral" href="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
