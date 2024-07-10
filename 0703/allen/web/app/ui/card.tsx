"use client";

import { Delete } from "@/app/ui/deleteBtn";
import React, { useState, useEffect } from "react";
import { Item, fetchItems } from "@/app/lib/actions";
import Link from "next/link";

export function Card() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchAndSetItems = async () => {
    try {
      const fetchedItems = await fetchItems();
      console.log("Fetched items:", fetchedItems); // 调试：打印设置的items
      setItems(fetchedItems);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  useEffect(() => {
    fetchAndSetItems();
  }, []);

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="card bg-base-100 w-96 h-128 shadow-xl">
          <figure>
            <img
              src={
                item.image_url
                  ? `http://100.89.152.5:8080${item.image_url}`
                  : "/sample.webp"
              }
              alt={item.name}
              className="w-full h-64 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>
            <span>${item.price}</span>
            <div className="card-actions justify-end">
              <Link href={`/items/${item.id}`} className="btn btn-primary">
                Edit
              </Link>
              <Delete id={item.id} onDelete={fetchAndSetItems} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
