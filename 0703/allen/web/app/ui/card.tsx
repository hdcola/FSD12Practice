"use client";

import { Delete } from "@/app/ui/deleteBtn";
import { Edit } from "@/app/ui/editBtn";
import React, { useState, useEffect } from "react";
import { Item, fetchItems } from "@/app/lib/actions";

export function Card() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    getItems();
  }, []);

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="card bg-base-100 w-96 h-128 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt={item.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>
            <span>${item.price}</span>
            <div className="card-actions justify-end">
              <Edit />
              <Delete />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
